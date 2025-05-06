import { useState, useEffect } from 'react';
import Notebox from './Notebox';
import { motion } from 'framer-motion';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load notes
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    setIsLoading(false);
  }, []);

  // Save notes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes, isLoading]);

  const addNote = () => {
    setNotes([{ id: Date.now(), content: '' }, ...notes]);
  };

  const updateNote = (id, newContent) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, content: newContent } : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 text-gray-500"
      >
        Loading your colorful notes...
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#1a649d] to-purple-50 p-6 rounded-3xl shadow-2xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={addNote}
          className="text-xl px-6 py-4 rounded-xl border-none text-white cursor-pointer shadow-lg mb-8 mx-auto block"
          style={{
            background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
            boxShadow: '0 4px 15px rgba(106, 17, 203, 0.4)'
          }}
        >
          ✨ Add New Note
        </motion.button>
        
        {notes.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No notes yet</h3>
            <p className="text-gray-500">Click the button above to create your first colorful note!</p>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {notes.map(note => (
              <Notebox
                key={note.id}
                id={note.id}
                initialContent={note.content}
                onSave={updateNote}
                onDelete={deleteNote}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Notes;