import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext'; // Adjust path as needed

export default function Home() {
  const { currentTheme } = useTheme();

  // Get theme-aware styles
  const getThemeStyles = () => ({
    bg: currentTheme?.bg || 'bg-gradient-to-br from-[#1a649d] to-purple-50',
    text: {
      primary: currentTheme?.text || 'text-white',
      secondary: currentTheme?.raw?.text ? `text-[${currentTheme.raw.text}]` : 'text-white/90'
    },
    button: {
      primary: currentTheme?.raw?.button 
        ? `bg-[${currentTheme.raw.button}]` 
        : 'bg-gradient-to-r from-[#6a11cb] to-[#2575fc]',
      secondary: currentTheme?.raw?.text 
        ? `bg-[${currentTheme.raw.text}] text-[${currentTheme.raw.button}]`
        : 'bg-white text-[#1a649d]'
    }
  });

  const themeStyles = getThemeStyles();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 ${themeStyles.bg}`}
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="text-center max-w-2xl"
      >
        <motion.h1 
          className={`text-5xl font-bold mb-6 ${themeStyles.text.primary}`}
          whileHover={{ scale: 1.05 }}
        >
          Welcome to NoteSphere
        </motion.h1>
        
        <motion.p 
          className={`text-xl mb-12 ${themeStyles.text.secondary}`}
          whileHover={{ scale: 1.02 }}
        >
          Your colorful space for creative notes and ideas
        </motion.p>

        <div className="flex flex-wrap justify-center gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/create"
              className={`inline-block px-8 py-4 text-xl font-medium rounded-xl shadow-xl ${themeStyles.button.primary} text-white`}
            >
              ✨ Create New Note
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/notes"
              className={`inline-block px-8 py-4 text-xl font-medium rounded-xl shadow-xl ${themeStyles.button.secondary}`}
            >
              📚 View All Notes
            </Link>
          </motion.div>
        </div>

        <motion.div
          className={`mt-16 ${themeStyles.text.secondary}`}
          whileHover={{ scale: 1.01 }}
        >
          <p className="mb-2">Start creating beautiful notes today!</p>
          <div className="text-4xl">👇</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}