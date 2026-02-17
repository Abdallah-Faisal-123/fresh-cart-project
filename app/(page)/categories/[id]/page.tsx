import getCategories, { getProductsByCategory } from '../../server/category.Actions';
import CategoryProductsScreen from '../../Screens/CategoryProducts.screen';

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.data.map((category) => ({
    id: category._id,
  }));
}

export default async function CategoryProductsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productsRes = await getProductsByCategory(id);
  const categoriesRes = await getCategories();

  // Find current category name
  const currentCategory = categoriesRes.data.find(cat => cat._id === id);

  return (
    <CategoryProductsScreen
      products={productsRes}
      categoryName={currentCategory?.name || 'Products'}
      categoryId={id}
    />
  );
}
