import { createContext, useContext, useState, useEffect } from 'react';

// Color conversion map for animatable values
const colorMap = {
  // Cosmic theme
  'from-purple-900': 'from-[#4c1d95]',
  'to-blue-900': 'to-[#1e40af]',
  'text-cyan-100': 'text-[#bae6fd]',
  'bg-indigo-600': 'bg-[#4f46e5]',
  'hover:bg-indigo-700': 'hover:bg-[#4338ca]',

  // Forest theme
  'from-green-900': 'from-[#166534]',
  'via-gray-900': 'via-[#111827]',
  'to-emerald-800': 'to-[#065f46]',
  'text-lime-100': 'text-[#ecfccb]',
  'bg-emerald-600': 'bg-[#059669]',
  'hover:bg-emerald-700': 'hover:bg-[#047857]',

  // Sunset theme
  'from-orange-900': 'from-[#9a3412]',
  'via-red-800': 'via-[#991b1b]',
  'to-purple-900': 'to-[#6b21a8]',
  'text-amber-100': 'text-[#fef3c7]',
  'bg-amber-600': 'bg-[#d97706]',
  'hover:bg-amber-700': 'hover:bg-[#b45309]'
};

// Convert Tailwind classes to animatable formats
const convertForAnimation = (classString) => {
  return classString.split(' ').map(part => colorMap[part] || part).join(' ');
};

export const themes = {
  cosmic: {
    name: 'cosmic',
    label: '🌌 Cosmic',
    bg: convertForAnimation('bg-gradient-to-br from-purple-900 via-black to-blue-900'),
    text: convertForAnimation('text-cyan-100'),
    button: convertForAnimation('bg-indigo-600 hover:bg-indigo-700'),
    card: 'bg-white/10 border-white/20',
    raw: {
      bg: ['#4c1d95', '#000000', '#1e40af'],
      text: '#bae6fd',
      button: '#4f46e5',
      buttonHover: '#4338ca'
    }
  },
  forest: {
    name: 'forest',
    label: '🌲 Forest',
    bg: convertForAnimation('bg-gradient-to-br from-green-900 via-gray-900 to-emerald-800'),
    text: convertForAnimation('text-lime-100'),
    button: convertForAnimation('bg-emerald-600 hover:bg-emerald-700'),
    card: 'bg-green-900/10 border-emerald-400/20',
    raw: {
      bg: ['#166534', '#111827', '#065f46'],
      text: '#ecfccb',
      button: '#059669',
      buttonHover: '#047857'
    }
  },
  sunset: {
    name: 'sunset',
    label: '🌇 Sunset',
    bg: convertForAnimation('bg-gradient-to-br from-orange-900 via-red-800 to-purple-900'),
    text: convertForAnimation('text-amber-100'),
    button: convertForAnimation('bg-amber-600 hover:bg-amber-700'),
    card: 'bg-orange-900/10 border-amber-400/20',
    raw: {
      bg: ['#9a3412', '#991b1b', '#6b21a8'],
      text: '#fef3c7',
      button: '#d97706',
      buttonHover: '#b45309'
    }
  }
};

export const themeList = Object.values(themes); // New: Easy access for iteration

const DEFAULT_THEME = themes.cosmic;

export const ThemeContext = createContext({
  currentTheme: DEFAULT_THEME,
  setCurrentTheme: () => console.warn('No theme provider'),
  themes,
  themeList
});

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME;

    try {
      const savedThemeName = localStorage.getItem('theme');
      return savedThemeName ?
        themes[savedThemeName] || DEFAULT_THEME :
        DEFAULT_THEME;
    } catch (error) {
      console.error('Error loading theme:', error);
      return DEFAULT_THEME;
    }
  });

  useEffect(() => {
    if (!currentTheme) return;

    try {
      localStorage.setItem('theme', currentTheme.name);
      document.documentElement.className =
        `${currentTheme.bg} ${currentTheme.text} transition-colors duration-300`;
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      setCurrentTheme,
      themes,
      themeList
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    console.warn('useTheme used outside ThemeProvider');
    return {
      currentTheme: DEFAULT_THEME,
      setCurrentTheme: () => {},
      themes,
      themeList
    };
  }

  return context;
};
