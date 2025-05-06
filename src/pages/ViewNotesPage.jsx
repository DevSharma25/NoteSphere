import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Notebox from '../components/notes/Notebox';
import { FaSearch, FaTrashAlt, FaExclamationTriangle } from 'react-icons/fa';

export default function ViewNotesPage() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
      const validatedNotes = savedNotes
        .filter(note => note && typeof note === 'object')
        .map(note => ({
          id: note.id || Date.now(),
          title: note.title || '',
          content: note.content || 'Empty note',
          date: note.date || new Date().toLocaleString(),
          color: note.color || `hsl(${(note.id || Date.now()) % 360}, 70%, 85%)`
        }));
      setNotes(validatedNotes);
    } catch (err) {
      setError('Failed to load notes. Please refresh the page.');
      console.error('Loading error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteNote = (id) => {
    try {
      const updatedNotes = notes.filter(note => note.id !== id);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (err) {
      setError('Failed to delete note.');
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/edit/${id}`;
  };

  const filteredNotes = notes.filter(note => {
    const term = searchTerm.toLowerCase();
    return note.content.toLowerCase().includes(term) || note.title.toLowerCase().includes(term);
  });

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center min-h-screen"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="text-4xl mb-4 text-purple-500 inline-block"
          >
            ✨
          </motion.div>
          <p className="text-xl text-gray-300">Loading your creative notes...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center p-6"
      >
        <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 max-w-md text-center">
          <FaExclamationTriangle className="text-red-400 text-4xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-100 mb-2">Oops!</h2>
          <p className="text-red-200 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="bg-red-500/50 hover:bg-red-500/70 text-white px-4 py-2 rounded-lg"
          >
            Refresh Page
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">
            Your Creative Collection
          </h1>
          <p className="text-purple-200">Browse and manage all your colorful notes</p>
        </motion.div>

        {/* Search */}
        <motion.div whileHover={{ scale: 1.01 }} className="relative mb-8 max-w-2xl mx-auto">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300" />
          <input
            type="text"
            placeholder="Search notes by content or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </motion.div>

        {/* Notes */}
        {filteredNotes.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <Notebox
                key={note.id}
                note={note}
                onDelete={deleteNote}
                onEdit={handleEdit}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            {notes.length === 0 ? (
              <>
                <div className="text-6xl mb-6 text-purple-400">📝</div>
                <h3 className="text-2xl font-medium text-gray-300 mb-2">No notes created yet</h3>
                <p className="text-gray-400 mb-6">Your creative space is waiting for your first note!</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/create'}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg"
                >
                  Create First Note
                </motion.button>
              </>
            ) : (
              <>
                <FaSearch className="text-5xl mx-auto mb-4 text-purple-400" />
                <h3 className="text-2xl font-medium text-gray-300 mb-2">No matching notes found</h3>
                <p className="text-gray-400">Try a different search term</p>
              </>
            )}
          </motion.div>
        )}

        {/* Bulk Delete */}
        {notes.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-12 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (window.confirm('Delete ALL notes? This cannot be undone.')) {
                  localStorage.removeItem('notes');
                  setNotes([]);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 text-red-400 border border-red-400/30 rounded-lg"
            >
              <FaTrashAlt /> Clear All Notes
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
