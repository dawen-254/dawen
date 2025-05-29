import { useState, useEffect } from "react";

export default function Products() {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

  // Filtered products based on search and category
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
    
    // Show feedback on mobile
    if (isMobile) {
      setIsCartOpen(true);
    }
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
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.quantity * 1999), 0); // Assuming each item costs 1999

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-600">PaintMart</h1>

          {/* Desktop Search Bar */}
          <div className="hidden sm:flex items-center flex-1 max-w-md mx-4">
            <input
              type="text"
              placeholder="Search for paints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors text-sm sm:text-base">
              Search
            </button>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Open shopping cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartTotal}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-4 py-2 bg-white shadow-sm">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search paints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white py-2 sm:py-3 overflow-x-auto shadow-sm">
        <div className="flex space-x-2 sm:space-x-4 px-4 container mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors text-xs sm:text-sm ${
                activeCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 sm:py-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
          {activeCategory === "All" ? "All Paint Products" : `${activeCategory} Paints`}
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPaints.map((paint) => (
            <div
              key={paint.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={paint.image}
                alt={paint.name}
                className="w-full h-32 sm:h-40 object-cover"
              />
              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold mb-1">{paint.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">{paint.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base font-bold">KSh 1,999</span>
                  <button
                    onClick={() => addToCart(paint)}
                    className="bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-blue-600 transition-colors text-xs sm:text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredPaints.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-base sm:text-lg">No paints found matching your criteria.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 text-blue-500 hover:text-blue-700 underline text-sm sm:text-base"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-8 py-4 sm:py-6 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600 text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} PaintMart Kenya. All rights reserved.</p>
        </div>
      </footer>

      {/* Shopping Cart Sidebar/Modal */}
      <div
        className={`fixed inset-0 z-50 ${isCartOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsCartOpen(false)}
      >
        <div 
          className={`absolute inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl transform ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-bold">Your Cart ({cartTotal})</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="mt-4 text-gray-500">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {cart.map((item) => (
                    <li key={item.id} className="flex items-start space-x-3 pb-3 border-b">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-500">{item.category}</p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2 py-1 bg-gray-200 rounded text-xs"
                            >
                              -
                            </button>
                            <span className="mx-2 text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2 py-1 bg-gray-200 rounded text-xs"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm font-bold">KSh {(item.quantity * 1999).toLocaleString()}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Remove item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5"
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
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Subtotal:</span>
                  <span className="font-bold text-blue-600">KSh {cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Delivery:</span>
                  <span className="text-sm">KSh 300</span>
                </div>
                <div className="flex justify-between mb-3 text-sm">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-lg">KSh {(cartSubtotal + 300).toLocaleString()}</span>
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors text-sm sm:text-base">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Cart Bottom Bar */}
      {isMobile && cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-40 p-2 sm:hidden">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-between px-4"
          >
            <span>View Cart ({cartTotal})</span>
            <span>KSh {cartSubtotal.toLocaleString()}</span>
          </button>
        </div>
      )}
    </div>
  );
}