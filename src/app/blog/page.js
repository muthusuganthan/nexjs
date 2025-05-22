import { revalidatePath } from 'next/cache';
import Link from 'next/link';

// export const  revalidate = 60 

const getRecipes = async () => {
  const res = await fetch("https://dummyjson.com/recipes");
  const data = await res.json();
  return data;
};

const Blog = async () => {
  const { recipes } = await getRecipes();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Recipe Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link 
            href={`/blog/${recipe.id}-${recipe.name.toLowerCase().replace(/\s+/g, '-')}`} 
            key={recipe.id}
            className="block hover:transform hover:scale-105 transition-transform duration-200"
          >
            <div className="border rounded-lg overflow-hidden shadow-lg h-full">
              <img 
                src={recipe.image} 
                alt={recipe.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{recipe.rating} ({recipe.reviewCount} reviews)</span>
                </div>
                <p className="text-gray-600 mb-2">
                  Prep: {recipe.prepTimeMinutes}min | Cook: {recipe.cookTimeMinutes}min
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {recipe.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-700">
                  {recipe.instructions[0].substring(0, 100)}...
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;