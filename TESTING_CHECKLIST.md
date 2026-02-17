# Fresh Cart Testing Checklist

## Complete Purchase Flow Test

### Step 1: Authentication
- [ ] Visit http://localhost:3000
- [ ] Click "Sign In" or "Sign Up"
- [ ] Create account or login with existing credentials
- [ ] Verify redirected to home page and logged in

### Step 2: Browse Products
- [ ] Home page loads with products
- [ ] Click on different categories
- [ ] Products display with images, titles, prices, ratings
- [ ] Search/filter works if available

### Step 3: Add to Cart
- [ ] Click "Add to Cart" on a product from Home
- [ ] Toast notification appears: "Added to cart"
- [ ] Cart count in navbar updates
- [ ] Click "Add to Cart" on CategoryProducts page
- [ ] Verify duplicate items increase quantity
- [ ] Click "Add to Cart" on Product Details page
- [ ] Test with different quantities on Product Details

### Step 4: View Wishlist (Optional)
- [ ] Click heart icon on product to add to wishlist
- [ ] Verify "Added to wishlist" message appears
- [ ] Go to Wishlist page
- [ ] Products appear in wishlist
- [ ] Click "Add to Cart" from wishlist
- [ ] Product added to cart with quantity 1

### Step 5: View Cart
- [ ] Go to /cart or click cart icon
- [ ] All added products appear
- [ ] Images, names, prices display correctly
- [ ] Quantities show correct amounts

### Step 6: Modify Cart
- [ ] Click +/- buttons to change quantity
- [ ] Order summary updates with new totals
- [ ] Remove button works - product removed from cart
- [ ] Shipping cost updates correctly:
  - [ ] Free shipping for total > 500 EGP
  - [ ] 50 EGP shipping for total ≤ 500 EGP

### Step 7: Checkout
- [ ] Click "Proceed to Checkout"
- [ ] Redirected to /checkout page
- [ ] Checkout form displays
- [ ] Form fields appear: First Name, Last Name, Email, Phone, Address, City, Postal Code, Country
- [ ] Order summary shows on the right side
- [ ] Cart items listed with quantities and prices

### Step 8: Fill Checkout Form
- [ ] Fill all required fields with valid data
- [ ] Select payment method:
  - [ ] COD (Cash on Delivery)
  - [ ] Card (Credit/Debit Card)
- [ ] Form validates (shows error if fields empty)

### Step 9: Place Order
- [ ] Click "Place Order" button
- [ ] If COD: Success page appears with confirmation
- [ ] If Card: Redirected to payment gateway
- [ ] Order details show total including correct shipping cost

### Step 10: After Order
- [ ] Success page displays with order summary
- [ ] Buttons work: "View Orders" and "Continue Shopping"
- [ ] Cart is cleared after successful order

## Error Scenarios

### Negative Tests
- [ ] Try to checkout with empty cart (should redirect)
- [ ] Try to checkout without login (should redirect to login)
- [ ] Submit checkout form with empty fields (should show error)
- [ ] Invalid form data (should validate)

### Edge Cases
- [ ] Add same product multiple times (quantity increases)
- [ ] Add product with no discount (shows regular price)
- [ ] Add product with discount (shows both prices crossed out)
- [ ] Very large quantity (should handle properly)
- [ ] Remove all items from cart (should show empty state)

## Performance Checks
- [ ] Pages load quickly
- [ ] No console errors
- [ ] No slow network requests
- [ ] Smooth animations and transitions
- [ ] Responsive on mobile/tablet/desktop

## Browser Compatibility
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)

## Data Persistence
- [ ] Refresh page - cart items persist
- [ ] Close and reopen browser - cart items persist
- [ ] Navigate away and back - cart items persist

---

## Common Issues to Check

1. **Token/Authentication Issues**
   - Verify user is logged in before checkout
   - Token should be in localStorage

2. **Shipping Cost Calculation**
   - Double-check > 500 EGP = FREE
   - ≤ 500 EGP = 50 EGP

3. **Cart Item Pricing**
   - Use priceAfterDiscount if available, else use price
   - Multiply by quantity for total

4. **Navigation After Order**
   - Buttons should work properly
   - Should not allow infinite cart modifications after order

5. **Toast Notifications**
   - Should appear for: Add to cart, Remove from cart, Added to wishlist
