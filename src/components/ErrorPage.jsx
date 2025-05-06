import { useRouteError, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const { currentTheme } = useTheme() || {};

  // Log error details for debugging
  useEffect(() => {
    console.error('Route error occurred:', {
      error: error.toString(),
      status: error.status,
      statusText: error.statusText,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }, [error]);

  // Get safe error message
  const getErrorMessage = () => {
    if (error.status === 404) return 'Page not found';
    if (error.status === 401) return 'Unauthorized access';
    if (error.status === 500) return 'Internal server error';
    return error.message || error.statusText || 'Unknown error occurred';
  };

  // Get theme styles with animation support
  const getThemeStyles = () => {
    const defaultBg = 'bg-gray-100 dark:bg-gray-900';
    const defaultText = 'text-gray-800 dark:text-gray-200';
    const defaultButton = 'bg-blue-500';
    const defaultCard = 'bg-white dark:bg-gray-800 shadow-lg';

    return {
      bg: currentTheme?.raw?.bg 
        ? `bg-gradient-to-br from-[${currentTheme.raw.bg[0]}] via-[${currentTheme.raw.bg[1]}] to-[${currentTheme.raw.bg[2]}]`
        : defaultBg,
      text: currentTheme?.raw?.text
        ? `text-[${currentTheme.raw.text}]`
        : defaultText,
      button: currentTheme?.raw?.button
        ? `bg-[${currentTheme.raw.button}]`
        : defaultButton,
      card: currentTheme?.card || defaultCard,
      raw: {
        button: currentTheme?.raw?.button || '#3b82f6', // blue-500
        buttonHover: currentTheme?.raw?.buttonHover || '#2563eb' // blue-600
      }
    };
  };

  const themeStyles = getThemeStyles();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${themeStyles.bg} ${themeStyles.text}`}
    >
      <motion.div
        initial={{ y: -20, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        className={`w-full max-w-md p-8 rounded-xl border ${themeStyles.card} border-red-400/30`}
      >
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full"
          >
            <span className="text-3xl">⚠️</span>
          </motion.div>
          
          <h1 className="text-3xl font-bold">Oops!</h1>
          <p className="text-lg">Sorry, an unexpected error has occurred.</p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="py-3 px-4 bg-red-50 dark:bg-red-900/20 rounded-lg"
          >
            <code className="text-red-600 dark:text-red-300 font-mono text-sm">
              {getErrorMessage()}
            </code>
            {error.status && (
              <div className="mt-1 text-sm opacity-80">
                Error code: {error.status}
              </div>
            )}
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <motion.button
              whileHover={{ 
                backgroundColor: themeStyles.raw.buttonHover,
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
              style={{ backgroundColor: themeStyles.raw.button }}
              className="px-5 py-2.5 text-white rounded-lg transition-all"
              onClick={() => navigate('/')}
            >
              Go Home
            </motion.button>
            <motion.button
              whileHover={{ 
                backgroundColor: '#4b5563', // gray-600
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-gray-500 text-white rounded-lg transition-colors"
              onClick={() => navigate(-1)}
            >
              Go Back
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}