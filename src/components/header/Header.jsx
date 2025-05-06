import { motion } from "framer-motion";
import { FaStickyNote, FaMicrophone, FaSun, FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import ThemeSelector from "../ThemeSelector";  // Import the ThemeSelector

export default function Header() {
  const { currentTheme, setTheme, themeList } = useTheme();  // Use the themeList from context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const quoteVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const navItemVariants = {
    hover: {
      scale: 1.05,
      textShadow: "0 0 8px rgba(192, 132, 252, 0.8)",
      transition: { type: "spring", stiffness: 400 }
    },
    tap: {
      scale: 0.95,
      rotate: -2
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <header
      className={`sticky top-0 z-50 shadow-xl rounded-2xl transition-colors duration-300 ${
        currentTheme.bg || "bg-gradient-to-r from-gray-900 to-gray-800"
      }`}
    >
      <motion.nav
        initial="hidden"
        animate="visible"
        className={`max-w-7xl mx-auto px-4 py-3 border-b-2 transition-all duration-300 ${
          currentTheme.card?.includes("border")
            ? currentTheme.card.split(" ").find(c => c.startsWith("border-"))
            : "border-purple-500/20"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo/Title */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 mb-3 md:mb-0"
          >
            <Link to="/" className="flex items-center gap-2">
              <FaStickyNote
                className="text-2xl"
                style={{ color: currentTheme.raw?.button || "#a78bfa" }}
              />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                NoteSphere
              </span>
            </Link>
          </motion.div>

          {/* Navigation */}
          <motion.div className="flex items-center gap-6 mb-3 md:mb-0">
            <motion.div
              variants={navItemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/create"
                className={`font-medium flex items-center gap-1 transition-colors duration-200 ${
                  currentTheme.text || "text-purple-300"
                } hover:text-white`}
              >
                <span className="hidden md:inline">Create</span> Note
              </Link>
            </motion.div>

            <motion.div
              variants={navItemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/notes"
                className={`font-medium flex items-center gap-1 transition-colors duration-200 ${
                  currentTheme.text || "text-blue-300"
                } hover:text-white`}
              >
                <span className="hidden md:inline">View</span> Notes
              </Link>
            </motion.div>
          </motion.div>

          {/* Theme Dropdown Button */}
          <motion.div
            className="relative"
            variants={quoteVariants}
            whileHover="hover"
          >
            <button
              onClick={toggleDropdown}
              className="font-medium text-white flex items-center gap-2 px-4 py-2 rounded-lg border border-transparent hover:bg-gray-800 transition-all duration-200"
            >
              <span>Select Theme</span>
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-52 bg-gray-900 text-white rounded-lg shadow-lg"
              >
                <ThemeSelector /> {/* Using the ThemeSelector here */}
              </motion.div>
            )}
          </motion.div>

          {/* Quote */}
          <motion.div
            variants={quoteVariants}
            whileHover="hover"
            className="text-center md:text-right"
          >
            <motion.h1
              className="text-sm md:text-base font-mono italic flex items-center gap-1"
              style={{ color: currentTheme.raw?.text || "#d1d5db" }}
              whileTap={{ scale: 0.95, rotate: -2 }}
            >
              <FaMicrophone
                className="text-purple-400"
                style={{ color: currentTheme.raw?.button || "#a78bfa" }}
              />
              <span>
                "Drop the Mic, Not Your Ideas."
                <span className="block text-xs opacity-70">
                  (Seriously, write them down.)
                </span>
              </span>
            </motion.h1>
          </motion.div>
        </div>
      </motion.nav>
    </header>
  );
}
