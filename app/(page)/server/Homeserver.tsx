import getCategories, { getProducts } from '../server/category.Actions'
import Homescreen from '../Screens/Home.screen'

export default async function HomePage() {
  const categoriesRes = await getCategories()
  const productsRes = await getProducts()
  console.log(productsRes.data)
  return <Homescreen res={categoriesRes} productsRes={productsRes} />
}
