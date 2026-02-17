import getCategories from '../server/category.Actions';
import Link from 'next/link';

export default async function CategoriesPage() {
  const response = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Categories</h1>
        <p className="text-gray-600 mb-12">Browse all product categories</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {response.data.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer h-full">
                {/* Category Image */}
                <div className="h-48 bg-linear-to-br from-green-50 to-emerald-50 flex items-center justify-center relative overflow-hidden">
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>

                {/* Category Info */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#16a34a] transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    Browse products in this category
                  </p>
                  <button className="w-full bg-[#16a34a] text-white py-2 px-4 rounded-lg hover:bg-[#15803d] transition-all duration-200 font-semibold group-hover:shadow-lg">
                    Explore Category
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
