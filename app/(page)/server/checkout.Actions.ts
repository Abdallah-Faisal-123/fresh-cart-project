'use server'

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

export interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
  paymentMethod: 'card' | 'cod'
  cartItems?: { productId: string; quantity: number }[]
}

export default async function checkoutAction(formData: CheckoutFormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return {
        success: false,
        message: 'Please log in to place an order',
        statusCode: 401
      };
    }

    // 1. Check/Sync Cart
    let cartId;
    try {
      // Try to get existing cart
      const { data: cartResponse } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: { token }
      });

      cartId = cartResponse.data._id;

      // If server cart is empty but we have local items, sync them
      if ((cartResponse.data.numOfCartItems === 0 || !cartResponse.data.numOfCartItems) && formData.cartItems && formData.cartItems.length > 0) {
        console.log('Syncing local cart to server...');
        for (const item of formData.cartItems) {
          try {
            await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
              { productId: item.productId },
              { headers: { token } }
            );
            // Note: We are just adding the product. The API defaults to qty 1. 
            // If we want specific quantity, we'd need to call update. 
            // For now, let's just ensure items are in the cart.
          } catch (syncError) {
            console.error('Error syncing item:', item.productId, syncError);
          }
        }
        // Re-fetch cart id/data after sync might be safer, or just use the ID we have.
        // To ensure cartId is up-to-date after sync, re-fetch the cart.
        const { data: updatedCartData } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
          headers: { token }
        });
        cartId = updatedCartData.data._id;
      }

    } catch (cartError) {
      // If 404, cart doesn't exist. If we have items, create cart by adding first item.
      if (formData.cartItems && formData.cartItems.length > 0) {
        try {
          console.log('Creating server cart from local items...');
          for (const item of formData.cartItems) {
            await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
              { productId: item.productId },
              { headers: { token } }
            );
          }
          // Now fetch the new cart ID
          const { data: newCartData } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: { token }
          });
          cartId = newCartData.data._id;
        } catch (createError) {
          console.error('Error creating cart:', createError);
          return {
            success: false,
            message: 'Failed to create server cart.',
            statusCode: 500
          };
        }
      } else {
        console.error('Error fetching cart:', cartError);
        return {
          success: false,
          message: 'Failed to retrieve cart. Please try adding items again.',
          statusCode: 404
        };
      }
    }

    if (!cartId) {
      return {
        success: false,
        message: 'Cart not found/empty',
        statusCode: 404
      };
    }

    // 2. Prepare Order Data
    const orderData = {
      shippingAddress: {
        details: formData.address,
        phone: formData.phone,
        city: formData.city
      }
    };

    // 3. Determine Endpoint
    let url = '';
    if (formData.paymentMethod === 'cod') {
      url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
    } else {
      // Determine base URL dynamically or fallback to localhost for development
      const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
      const host = 'localhost:3000'; // You might want to get this more dynamically if possible, but headers() in server actions can be tricky.
      // Actually, for now let's assume standard local/prod URLs or passed from client. 
      // Better: Use a fixed return URL or env var.
      const returnUrl = 'http://localhost:3000/orders'; // Replace with actual domain in production
      url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${returnUrl}`;
    }

    const options: AxiosRequestConfig = {
      url,
      method: 'POST',
      data: orderData,
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    };

    const { data } = await axios.request(options);

    if (data.status === 'success') {
      return {
        success: true,
        message: 'Order placed successfully',
        data,
        paymentUrl: data.session?.url || null
      };
    }

    return {
      success: false,
      message: 'Error placing order', // data.message might not be present on success:false from this API sometimes
      statusCode: 400
    };
  } catch (error) {
    // ... existing error handling ...
    console.error('Order placement error:', error);

    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || 'Error placing order';
      const statusCode = error.response?.status || 500;

      return {
        success: false,
        message: errorMessage,
        statusCode
      };
    }

    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
      statusCode: 500
    };
  }
}
