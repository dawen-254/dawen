import { useState, useEffect } from 'react';

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState('products');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Mock photo data
  const categories = {
    products: [
      { id: 1, src: "/MOC1.jpg", alt: "Product 1" },
      { id: 2, src: "/MOC2.jpg", alt: "Product 2" },
      { id: 3, src: "/MOC3.jpg", alt: "Product 3" },
      { id: 4, src: "/MOC4.jpg", alt: "Product 4" },
      { id: 5, src: "/MOC5.jpg", alt: "Product 5" }
    ],
    interior: [
      { id: 1, src: "int1.jpg", alt: "Interior 1" },
      { id: 2, src: "int2.jpg", alt: "Interior 2" },
      { id: 3, src: "int3.jpg", alt: "Interior 3" }
    ],
    exterior: [
      { id: 1, src: "/HOUSE1.jpg", alt: "Exterior 1" },
      { id: 2, src: "/HOUSE2.jpg", alt: "Exterior 2" },
      { id: 3, src: "/HOUSE3.jpg", alt: "Exterior 3" },
      { id: 4, src: "/HOUSE4.jpg", alt: "Exterior 4" },
      { id: 5, src: "/HOUSE5.jpg", alt: "Exterior 5" },
      { id: 6, src: "/HOUSE8.jpg", alt: "Exterior 6" }
    ]
  };

  // Set initial photos and handle window resize
  useEffect(() => {
    setPhotos(categories[activeCategory]);
    setLoading(false);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeCategory]);

  const getColumns = () => {
    if (windowWidth >= 1024) return 3;
    if (windowWidth >= 768) return 2;
    return 1;
  };

  const renderGallery = () => {
    const cols = getColumns();
    const rows = [];
    for (let i = 0; i < photos.length; i += cols) {
      rows.push(photos.slice(i, i + cols));
    }

    return (
      <div className="grid gap-6">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {row.map(photo => (
              <div
                key={photo.id}
                className="overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Jorozz Paints</h1>
          <p className="text-lg md:text-xl opacity-90">Bringing Colors to Life</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-center space-x-4">
          {Object.keys(categories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`capitalize px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </nav>

      {/* Gallery Content */}
      <main className="max-w-6xl mx-auto p-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="text-xl font-semibold text-gray-500">Loading gallery...</span>
          </div>
        ) : (
          <>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 capitalize">
              {activeCategory} Gallery
            </h2>
            {renderGallery()}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Jorozz Paints. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductsPage;