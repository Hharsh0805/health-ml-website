import { Link } from 'react-router-dom'; // Import from react-router-dom
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Heart className="h-6 w-6 text-green-500" />
            <span className="ml-2 text-xl font-semibold">HealthAI</span>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-6">
            <Link to="/" className="hover:text-green-500 transition duration-300">Home</Link>
            <Link to="#features" className="hover:text-green-500 transition duration-300">Features</Link>
            <Link to="#insights" className="hover:text-green-500 transition duration-300">Insights</Link>
            <Link to="#" className="hover:text-green-500 transition duration-300">Privacy Policy</Link>
            <Link to="#" className="hover:text-green-500 transition duration-300">Terms of Service</Link>
          </nav>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} HealthAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
