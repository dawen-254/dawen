import { useState } from "react";

export default function Products() {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Mock paint data with placeholder images
  const paints = [
    { id: 1, name: "Acrylic Paint Set", category: "Interior Wall", image: "https://placehold.co/300x200/3498db/ffffff?text=Acrylic+Paint" },
    { id: 2, name: "Classic Interior Wall Paint", category: "Interior Wall", image: "https://placehold.co/300x200/2c3e50/ffffff?text=Interior+Wall" },
    { id: 3, name: "Rock Master Coating", category: "Rock Master", image: "https://placehold.co/300x200/e67e22/ffffff?text=Rock+Master" },
    { id: 4, name: "Premium Rock Master Finish", category: "Rock Master", image: "https://placehold.co/300x200/f39c12/ffffff?text=Rock+Finish" },
    { id: 5, name: "High-Gloss Undercoat", category: "Undercoat", image: "https://placehold.co/300x200/27ae60/ffffff?text=Undercoat+1" },
    { id: 6, name: "Smooth Undercoat Primer", category: "Undercoat", image: "https://placehold.co/300x200/2ecc71/ffffff?text=Primer" },
    { id: 7, name: "Natural Stone Seal", category: "Stone Seal", image: "https://placehold.co/300x200/9b59b6/ffffff?text=Stone+Seal" },
    { id: 8, name: "Eco-Friendly Stone Seal", category: "Stone Seal", image: "https://placehold.co/300x200/8e44ad/ffffff?text=Eco+Seal" },
    { id: 9, name: "Classic Emulsion", category: "Emulsion", image: "https://placehold.co/300x200/16a085/ffffff?text=Emulsion+1" },
    { id: 10, name: "Luxury Emulsion Finish", category: "Emulsion", image: "https://placehold.co/300x200/27ae60/ffffff?text=Emulsion+2" },
    { id: 11, name: "Advanced Weathershield", category: "Weathershield", image: "https://placehold.co/300x200/c0392b/ffffff?text=Weather+Shield" },
    { id: 12, name: "Extreme Weather Protection", category: "Weathershield", image: "https://placehold.co/300x200/e74c3c/ffffff?text=Extreme+Shield" },
  ];

  const categories = ["All", "Interior Wall", "Rock Master", "Undercoat", "Stone Seal", "Emulsion", "Weathershield"];

  const filteredPaints = paints.filter(
    (paint) =>
      paint.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (activeCategory === "All" || paint.category === activeCategory)
  );

  const addToCart = (paint) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === paint.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === paint.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...paint, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id && item.quantity + change > 0
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-blue-600">PaintMart</h1>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-gray-100"
            aria-label="View cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartTotal}
              </span>
            )}
          </button>
        </div>
        {/* Mobile Search Bar */}
        <div className="px-4 pb-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </header>

      {/* Categories */}
      <div className="bg-white py-2 overflow-x-auto">
        <div className="flex gap-2 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 whitespace-nowrap text-sm rounded-full ${
                activeCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">{activeCategory === "All" ? "All Paints" : `${activeCategory} Paints`}</h2>
        {filteredPaints.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No results found.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-2 text-blue-500 underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredPaints.map((paint) => (
              <div key={paint.id} className="bg-white rounded shadow p-2">
                <img src={paint.image} alt={paint.name} className="w-full h-28 object-cover rounded" />
                <h3 className="text-sm mt-2 line-clamp-2">{paint.name}</h3>
                <button
                  onClick={() => addToCart(paint)}
                  className="mt-2 w-full text-xs bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white py-3 border-t text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} PaintMart Kenya
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex">
          <div className="bg-white w-full max-w-xs sm:max-w-sm ml-auto h-full rounded-l-lg shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500">
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3 overflow-auto h-[calc(100vh-100px)]">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-start gap-2 border-b pb-2">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <div className="flex items-center mt-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 bg-gray-200 text-sm"
                        >
                          -
                        </button>
                        <span className="mx-2 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 bg-gray-200 text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between mb-2 text-sm">
                  <span>Items:</span>
                  <span className="font-bold text-blue-600">{cartTotal}</span>
                </div>
                <button
                  onClick={() => alert("Checkout not implemented yet.")}
                  className="w-full bg-blue-500 text-white py-2 rounded text-sm hover:bg-blue-600"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}