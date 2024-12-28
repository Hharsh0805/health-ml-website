import { Link } from 'react-router-dom'; // Import from react-router-dom
import { Heart } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-green-500" />
            <span className="ml-2 text-2xl font-semibold text-gray-800">HealthAI</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-green-500 transition duration-300">Home</Link>
            <Link to="#features" className="text-gray-700 hover:text-green-500 transition duration-300">Features</Link>
            <Link to="#insights" className="text-gray-700 hover:text-green-500 transition duration-300">Insights</Link>
            <Link to="#" className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">Get Started</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
