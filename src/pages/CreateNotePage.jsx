import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import Notebox from '../components/notes/Notebox';
import { FaMagic, FaSave, FaHistory, FaMarkdown } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ThemeContext } from '../context/ThemeContext';

export default function CreateNotePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [recentNotes, setRecentNotes] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const { currentTheme } = useContext(ThemeContext); // Get current theme

  // Load recent notes
  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    setRecentNotes(notes.slice(0, 3));
  }, []);

  const handleSave = () => {
    if (!content.trim()) return;
    
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleString(),
      color: `hsl(${Math.random() * 360}, 70%, 85%)`,
      isMarkdown: isPreview
    };
    
    const updatedNotes = [newNote, ...notes];
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setTitle('');
    setContent('');
    setRecentNotes(updatedNotes.slice(0, 3));
    setIsTyping(false);
    setIsPreview(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen p-6 ${currentTheme.bg} ${currentTheme.text}`} // Dynamic theme
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 text-center"
        >
          <motion.h1 
            className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300"
            whileHover={{ scale: 1.02 }}
          >
            <FaMagic className="inline mr-2" />
            Create Magic Notes
          </motion.h1>
          <motion.p
            className={`italic ${currentTheme.text.replace('100', '200')}`} // Dynamic text
            whileHover={{ scale: 1.01 }}
          >
            "Drop the Mic, Not Your Ideas."
            <span className={`block text-sm ${currentTheme.text.replace('100', '300/70')}`}>
              (Creatively, write them down.)
            </span>
          </motion.p>
        </motion.div>

        {/* Note Creation Card */}
        <motion.div
          whileHover={{ scale: 1.005 }}
          className={`rounded-xl shadow-2xl p-6 mb-8 border ${currentTheme.card}`} // Dynamic card
        >
          {/* Title Input */}
          <motion.input
            type="text"
            placeholder="Note Title (Optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-4 mb-4 rounded-lg border ${currentTheme.card} ${currentTheme.text} placeholder-${currentTheme.text.replace('100', '300')} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            whileFocus={{ scale: 1.01 }}
          />

          {/* Markdown Toggle */}
          <div className="flex justify-end mb-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPreview(!isPreview)}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                isPreview
                  ? `${currentTheme.button} text-white`
                  : `${currentTheme.card.replace('bg-', 'bg-').replace('border-', 'border-')} ${currentTheme.text}`
              }`}
            >
              <FaMarkdown />
              {isPreview ? 'Switch to Editor' : 'Preview Markdown'}
            </motion.button>
          </div>

          {/* Content Area */}
          {isPreview ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`prose max-w-none p-4 rounded-lg min-h-[160px] ${currentTheme.card}`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || '*Nothing to preview yet*'}
              </ReactMarkdown>
            </motion.div>
          ) : (
            <motion.textarea
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              placeholder="✨ Start typing your magical thoughts here... (Supports **Markdown**!)"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setIsTyping(e.target.value.length > 0);
              }}
              className={`w-full p-4 h-48 rounded-lg border ${currentTheme.card} ${currentTheme.text} placeholder-${currentTheme.text.replace('100', '300')} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none`}
              whileFocus={{ scale: 1.01 }}
            />
          )}

          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(192, 132, 252, 0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            disabled={!content.trim()}
            className={`w-full mt-4 px-6 py-3 rounded-lg text-lg font-medium flex items-center justify-center gap-2 transition-all ${
              content.trim()
                ? `${currentTheme.button} text-white`
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            <FaSave />
            {isTyping ? "Save This Inspiration" : "Save Note"}
          </motion.button>
        </motion.div>

        {/* Recent Notes Section */}
        {recentNotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`rounded-xl p-6 border ${currentTheme.card}`}
          >
            <motion.h2 
              className="text-2xl font-semibold mb-6 flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              <FaHistory className={currentTheme.text.replace('100', '300')} />
              <span className={`bg-clip-text text-transparent ${currentTheme.text.includes('purple') ? 'bg-gradient-to-r from-purple-200 to-blue-200' : currentTheme.text.includes('green') ? 'bg-gradient-to-r from-emerald-200 to-teal-200' : 'bg-gradient-to-r from-amber-200 to-orange-200'}`}>
                Your Recent Creations
              </span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentNotes.map((note) => (
                <Notebox 
                  key={note.id} 
                  note={note}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}