import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaCopy, FaMarkdown } from 'react-icons/fa';
import { useState, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ThemeContext } from '../../context/ThemeContext';

// Utility: Choose black or white text based on HSL background
const getContrastTextColor = (hslColor) => {
  const hslMatch = hslColor.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
  if (!hslMatch) return '#111'; // fallback

  const lightness = parseFloat(hslMatch[3]);
  return lightness > 75 ? '#111' : '#f9f9f9';
};

const Notebox = ({ note, onDelete, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { currentTheme } = useContext(ThemeContext);

  // Enhanced safe defaults with theme-aware fallbacks
  const safeNote = note || { 
    id: Date.now(),
    title: 'Untitled Note',
    content: 'No content available',
    date: new Date().toLocaleString(),
    isMarkdown: false,
    color: currentTheme.card.replace('bg-', '').split('/')[0] || '#d1d5db'
  };

  // Theme-aware color generation
  const noteColor = safeNote.color || `hsl(${safeNote.id % 360}, 70%, 85%)`;
  const darkerColor = `hsl(${safeNote.id % 360}, 70%, 75%)`;

  // Compute contrast text color based on background lightness
  const textColor = getContrastTextColor(noteColor);

  const handleCopy = () => {
    navigator.clipboard.writeText(safeNote.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Theme-aware button styles
  const getActionButtonStyle = (isDestructive = false) => ({
    whileHover: { 
      scale: 1.1, 
      backgroundColor: isDestructive ? '#ff000020' : '#ffffff20'
    },
    whileTap: { scale: 0.9 },
    className: `p-2 rounded-full ${currentTheme.text} hover:bg-white/20 transition-all`
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        boxShadow: `0 10px 20px ${noteColor}40`,
        transition: { duration: 0.3 }
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 15
      }}
      className="relative rounded-xl overflow-hidden border border-white/20"
      style={{
        background: `linear-gradient(135deg, ${noteColor} 0%, ${darkerColor} 100%)`,
        boxShadow: `0 4px 15px ${noteColor}30`
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Note Content */}
      <div className="p-5">
        {safeNote.title && (
          <motion.h3 
            className="font-bold text-lg mb-2"
            style={{ color: textColor }}
            animate={isHovered ? { x: 3 } : { x: 0 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            {safeNote.title}
          </motion.h3>
        )}
        
        {/* Enhanced Markdown/Text Display */}
        <motion.div 
          className="mb-3 max-h-40 overflow-y-auto"
          animate={isHovered ? { scale: 1.01 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {safeNote.isMarkdown ? (
            <div className={`prose max-w-none`} style={{ color: textColor }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {safeNote.content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="whitespace-pre-wrap" style={{ color: textColor }}>
              {safeNote.content}
            </p>
          )}
        </motion.div>

        {/* Date + Markdown Indicator */}
        <motion.div
          className="flex justify-between items-center"
          animate={isHovered ? { opacity: 1 } : { opacity: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <small className="text-sm opacity-70" style={{ color: textColor }}>
            {safeNote.date}
          </small>
          {safeNote.isMarkdown && (
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className={`text-xs px-2 py-1 rounded-full flex items-center ${currentTheme.name === 'cosmic' 
                ? 'bg-indigo-100 text-indigo-800' 
                : currentTheme.name === 'forest' 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-amber-100 text-amber-800'}`}
            >
              <FaMarkdown className="mr-1" /> MD
            </motion.span>
          )}
        </motion.div>
      </div>

      {/* Enhanced Action Buttons */}
      <motion.div 
        className={`absolute bottom-0 left-0 right-0 p-2 flex justify-center gap-3 border-t ${currentTheme.card}`}
        initial={{ opacity: 0, y: 10 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {onEdit && (
          <motion.button
            {...getActionButtonStyle()}
            onClick={() => onEdit(safeNote.id)}
          >
            <FaEdit />
          </motion.button>
        )}
        
        <motion.button
          {...getActionButtonStyle()}
          onClick={handleCopy}
        >
          <FaCopy />
        </motion.button>
        
        {onDelete && (
          <motion.button
            {...getActionButtonStyle(true)}
            onClick={() => onDelete(safeNote.id)}
          >
            <FaTrash />
          </motion.button>
        )}
      </motion.div>

      {/* Enhanced Copy Confirmation */}
      {isCopied && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`absolute top-2 right-2 px-2 py-1 rounded text-xs shadow-lg ${currentTheme.name === 'cosmic' 
            ? 'bg-indigo-100 text-indigo-800' 
            : currentTheme.name === 'forest' 
            ? 'bg-emerald-100 text-emerald-800' 
            : 'bg-amber-100 text-amber-800'}`}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          Copied!
        </motion.div>
      )}
    </motion.div>
  );
};

export default Notebox;
