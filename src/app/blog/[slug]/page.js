import { notFound } from 'next/navigation';

const getRecipe = async (id) => {
  try {
    const res = await fetch(`https://dummyjson.com/recipes/${id}`, {
      next: {
        revalidate: 3600 // Revalidate every hour
      }
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        notFound();
      }
      throw new Error('Failed to fetch recipe');
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
};

const Bloghost = async ({ params }) => {
  // Ensure params is resolved before accessing slug
  const slug = await Promise.resolve(params.slug);
  // Extract the ID from the slug (format: "id-recipe-name")
  const id = slug.split('-')[0];
  const recipe = await getRecipe(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <img 
            src={recipe.image} 
            alt={recipe.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>
        
        <div className="flex items-center mb-6">
          <span className="text-yellow-500 text-2xl">★</span>
          <span className="ml-2 text-xl">{recipe.rating} ({recipe.reviewCount} reviews)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Details</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Prep Time:</span> {recipe.prepTimeMinutes} minutes</p>
              <p><span className="font-medium">Cook Time:</span> {recipe.cookTimeMinutes} minutes</p>
              <p><span className="font-medium">Servings:</span> {recipe.servings}</p>
              <p><span className="font-medium">Difficulty:</span> {recipe.difficulty}</p>
              <p><span className="font-medium">Cuisine:</span> {recipe.cuisine}</p>
              <p><span className="font-medium">Calories:</span> {recipe.caloriesPerServing} per serving</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc list-inside space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-700">{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Bloghost;
