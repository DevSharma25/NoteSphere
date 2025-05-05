import { motion } from "framer-motion";
import { FaStickyNote, FaMicrophone } from "react-icons/fa";

export default function Header() {
  const quoteVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-gray-800 shadow-xl rounded-2xl">
      <motion.nav 
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 py-3 border-b-2 border-purple-500/20"
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
        
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 mb-3 md:mb-0"
          >
            <FaStickyNote className="text-purple-400 text-2xl" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              NoteSphere
            </span>
          </motion.div>

      
          <motion.div 
            variants={quoteVariants}
            whileHover="hover"
            className="text-center md:text-right"
          >
            <motion.h1 
              className="text-sm md:text-base font-mono italic text-gray-300 flex items-center gap-1"
              whileTap={{ scale: 0.95, rotate: -2 }}
            >
              <FaMicrophone className="text-purple-400" />
              <span>
                "Drop the Mic, Not Your Ideas."
                <span className="block text-xs text-purple-300/70">(Seriously, write them down.)</span>
              </span>
            </motion.h1>
          </motion.div>
        </div>
      </motion.nav>
    </header>
  );
}