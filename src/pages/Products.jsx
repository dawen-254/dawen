import { useState } from "react";

export default function App() {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Mock paint data with new categories
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
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <img src="https://placehold.co/100x50/3498db/ffffff?text=Jorozz+Paints" alt="Logo" className="h-8" />
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-gray-100 rounded-full"
            aria-label="View cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
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
            className="w-full px-3 py-2 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </header>

      {/* Categories */}
      <div className="bg-white py-3 overflow-x-auto">
        <div className="flex gap-2 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 whitespace-nowrap rounded-full transition-colors ${
                activeCategory === category
                  ? "bg-black text-white font-bold"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">{activeCategory === "All" ? "All Paint Products" : `${activeCategory} Paints`}</h2>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPaints.map((paint) => (
              <div
                key={paint.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img src={paint.image} alt={paint.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{paint.name}</h3>
                  <button
                    onClick={() => addToCart(paint)}
                    className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 py-6 border-t text-center text-gray-600">
        &copy; {new Date().getFullYear()} Jorozz Paints Kenya
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 translate-x-0">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Shopping Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500">
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3 overflow-auto h-[calc(100vh-100px)]">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 border-b pb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 bg-gray-200 rounded text-black"
                        >
                          -
                        </button>
                        <span className="mx-2 text-black">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 bg-gray-200 rounded text-black"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between mb-4">
                  <span className="font-bold">Items:</span>
                  <span className="font-bold text-blue-600">{cartTotal}</span>
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
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