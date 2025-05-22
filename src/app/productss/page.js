import Image from 'next/image';

const getproducts = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data;
};

const Productss = async () => {
  const { products } = await getproducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={product.id <= 4}
              />
              {product.discountPercentage > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                  -{Math.round(product.discountPercentage)}%
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 line-clamp-1">{product.title}</h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.discountPercentage > 0 && (
                    <span className="text-gray-400 line-through text-sm">
                      ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                    </span>
                  )}
                  <span className="text-lg font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                <span className="text-sm text-gray-500">{product.brand}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productss;
