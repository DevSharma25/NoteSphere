import { useState } from 'react';
import { motion } from 'framer-motion';

const Notebox = ({ id, initialContent, onSave, onDelete }) => {
  const [content, setContent] = useState(initialContent || '');
  const [isEditing, setIsEditing] = useState(!initialContent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="relative flex justify-center items-center my-5 p-5 rounded-xl shadow-lg w-[80%] max-w-[300px] z-10"
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        border: '2px solid rgba(255,255,255,0.3)'
      }}
    >
      <div className="w-full">
        {isEditing ? (
          <textarea
            className="block mb-3 w-full resize-none h-32 p-3 rounded-lg text-black border-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition-all"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ background: 'rgba(255,255,255,0.7)' }}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="block mb-3 w-full min-h-[8rem] p-3 rounded-lg bg-white/70 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {content || <span className="text-gray-400">Click to edit</span>}
          </motion.div>
        )}

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onSave(id, content);
              setIsEditing(false);
            }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
          >
            {isEditing ? 'Save' : 'Edit'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(id)}
            className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
          >
            Delete
          </motion.button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-purple-400"></div>
      <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-amber-300"></div>
    </motion.div>
  );
};

export default Notebox;