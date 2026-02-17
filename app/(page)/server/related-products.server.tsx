import ProductDetailsScreen from "../Screens/productDetails.screen"
import getCategories, { getProducts } from "./category.Actions"

export default async function RelatedProducts() {
  const categoriesRes = await getCategories()
  const productsRes = await getProducts()
  console.log(productsRes.data)
  return <ProductDetailsScreen res={categoriesRes} productsRes={productsRes} />
}
