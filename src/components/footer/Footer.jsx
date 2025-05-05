import { FaGithub, FaTwitter, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8 px-4 border-t border-gray-700 rounded-2xl">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Branding with Home Link */}
          <div className="space-y-2">
            <Link 
              to="/" 
              className="flex items-center gap-2 group"
            >
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 group-hover:from-purple-500 group-hover:to-blue-400 transition-all">
                NoteSphere
              </span>
              <FaHome className="text-blue-400 group-hover:text-purple-400 transition" />
            </Link>
            <p className="text-gray-400 italic">Your thoughts, beautifully organized</p>
          </div>

          {/* Quick Navigation */}
          <div className="flex justify-center">
            <ul className="flex flex-col md:flex-row gap-4 md:gap-8">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-white transition flex items-center gap-1"
                >
                  <FaHome size={14} /> Home
                </Link>
              </li>
              <li>
                <a 
                  href="tel:+918619581479" 
                  className="text-gray-300 hover:text-white transition"
                >
                  Contact: 8619581479
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex justify-end gap-4">
            <a 
              href="https://github.com/DevSharma25" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-gray-700"
            >
              <FaGithub size={20} />
            </a>
            <a 
              href="https://twitter.com/@Devendraaharma" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition p-2 rounded-full hover:bg-gray-700"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Copyright/Legal */}
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} NoteSphere. Created by Devendra Sharma. 
            <span className="mx-2">|</span>
            <Link to="/privacy" className="hover:text-gray-300 transition">Privacy Policy</Link>
            <span className="mx-2">|</span>
            <Link to="/terms" className="hover:text-gray-300 transition">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}