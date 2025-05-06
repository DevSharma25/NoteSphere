import { FaGithub, FaTwitter, FaHome, FaPlus, FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext"; // Adjust path as needed

export default function Footer() {
  const { currentTheme = {} } = useTheme?.() || {};
  const themeColor = currentTheme?.text || "text-gray-300";

  const navItem = {
    hover: { 
      scale: 1.05,
      color: "#ffffff",
      transition: { type: "spring", stiffness: 300 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 py-10 px-4 border-t border-gray-700 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Branding */}
          <motion.div whileHover={{ scale: 1.02 }} className="space-y-2 text-center md:text-left">
            <Link to="/" className="flex items-center justify-center md:justify-start gap-2 group">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 group-hover:from-purple-500 group-hover:to-blue-400 transition-all">
                NoteSphere
              </span>
              <FaHome className="text-blue-400 group-hover:text-purple-400 transition" />
            </Link>
            <p className="text-gray-400 italic text-sm">Your thoughts, beautifully organized</p>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center">
            <ul className="flex flex-col md:flex-row gap-6 items-center">
              {[
                { to: "/create", icon: <FaPlus className="text-purple-400" />, label: "Create" },
                { to: "/notes", icon: <FaBookOpen className="text-blue-400" />, label: "View Notes" },
                { href: "tel:+918619581479", icon: <span className="text-yellow-400">✆</span>, label: "Contact", external: true }
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  variants={navItem}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {item.external ? (
                    <a href={item.href} className={`transition flex items-center gap-1 ${themeColor}`}>
                      {item.icon} {item.label}
                    </a>
                  ) : (
                    <Link to={item.to} className={`transition flex items-center gap-1 ${themeColor}`}>
                      {item.icon} {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-4">
            {[
              {
                href: "https://github.com/DevSharma25",
                icon: <FaGithub size={20} />,
                hoverColor: "hover:text-white"
              },
              {
                href: "https://twitter.com/@Devendraaharma",
                icon: <FaTwitter size={20} />,
                hoverColor: "hover:text-blue-400"
              }
            ].map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 ${item.hoverColor} transition p-2 rounded-full hover:bg-gray-700`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Legal Section */}
        <motion.div 
          className="border-t border-gray-700 mt-6 pt-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} NoteSphere. Created by Devendra Sharma.
            <span className="mx-2">|</span>
            <Link to="/privacy" className="hover:text-gray-300 transition">Privacy Policy</Link>
            <span className="mx-2">|</span>
            <Link to="/terms" className="hover:text-gray-300 transition">Terms</Link>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
