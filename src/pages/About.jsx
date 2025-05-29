import { useState } from "react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">About Jorozz Paints Kenya</h2>
          <p className="max-w-xl mx-auto text-lg opacity-90">
            Bringing color and life to new homes since 2019 — trusted by homeowners across Kenya.
          </p>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src="/VVB/HOUSE6.jpg"   // Replace with your actual image path
              alt="PaintPro Team Painting a House"
              className="rounded-lg shadow-md"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4 text-blue-700">Our Story</h3>
            <p className="mb-4">
              Founded in 2019, Jorozz Paints Kenya has been dedicated to transforming newly built houses into beautiful homes with premium-quality interior and exterior painting services.
            </p>
            <p>
              With a team of skilled professionals and a passion for excellence, we've completed over 500 successful projects across Nairobi and surrounding regions. Our commitment to quality, punctuality, and customer satisfaction sets us apart.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-8 text-blue-700">Mission & Vision</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-3 text-blue-600">Our Mission</h4>
              <p>
                To deliver exceptional painting solutions that enhance the beauty, durability, and value of every home we work on.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-3 text-blue-600">Our Vision</h4>
              <p>
                To be the most trusted and recognized painting service provider in East Africa, known for excellence and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-8 text-blue-700">Core Values</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span>🎨</span>
              </div>
              <h4 className="font-semibold text-black mb-2">Quality Craftsmanship</h4>
              <p className="text-black">We use premium paints and techniques to ensure lasting results.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span>🤝</span>
              </div>
              <h4 className="font-semibold text-black mb-2">Customer First</h4>
              <p className="text-black">Your satisfaction is our priority — we listen, adapt, and exceed expectations.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span>⏰</span>
              </div>
              <h4 className="font-semibold text-black mb-2">Timely Delivery</h4>
              <p className="text-black">We respect your time and always complete projects within agreed timelines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to transform your new house into a masterpiece?
          </h3>
          <p className="mb-6 max-w-xl mx-auto opacity-90">
            Get a free quote today and let our experts bring your vision to life.
          </p>
          <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors">
            Request a Free Quote
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Jorozz Paints Kenya. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Transforming new houses into beautiful homes since 2019.
          </p>
        </div>
      </footer>
    </div>
  );
}