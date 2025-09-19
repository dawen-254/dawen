export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Jorozz Paints</h3>
            <p className="text-gray-600">
              Bringing colorful, vibrant paints to your doorstep since 2019
            </p>
          </div>
          <div>
            <h3 className="text-blue font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-600 hover:text-green-600">About Us</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-green-600">Contact</a></li>
              <li><a href="/products" className="text-gray-600 hover:text-green-600">Shop</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-blue font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">hello@jorozzpaints.com</li>
              <li className="text-gray-600">+254 7113750834</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} JOROZZPAINTS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}