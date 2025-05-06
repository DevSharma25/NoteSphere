import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; // Adjust path as needed
import { FaPalette } from 'react-icons/fa'; 

export default function ThemeSelector() {
  const { currentTheme = {}, setCurrentTheme, themeList = [] } = useTheme();

  const getThemeStyles = () => ({
    button: {
      background: currentTheme?.raw?.button || '#6366f1',
      hoverBackground: currentTheme?.raw?.buttonHover || '#4f46e5'
    },
    dropdown: {
      background: currentTheme?.card || 'bg-white dark:bg-gray-800',
      text: currentTheme?.text || 'text-gray-800 dark:text-gray-200'
    }
  });

  const themeStyles = getThemeStyles();

  return (
    <motion.ul
      className={`dropdown-content menu p-2 shadow rounded-box w-52 ${themeStyles.dropdown.background} ${themeStyles.dropdown.text}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {themeList.map((theme) => (
        <motion.li
          key={theme.name}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            onClick={() => setCurrentTheme(theme)}
            className={`flex justify-between items-center w-full px-2 py-1 rounded ${
              currentTheme.name === theme.name ? 'font-semibold underline' : ''
            }`}
            aria-label={`Select ${theme.name} theme`}
          >
            <span>{theme.label}</span>
            {currentTheme.name === theme.name && (
              <motion.span
                className="ml-2 text-green-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                ✓
              </motion.span>
            )}
          </button>
        </motion.li>
      ))}
    </motion.ul>
  );
}
