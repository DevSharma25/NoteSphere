// pages/NotesPage.jsx (updated version)
import { motion } from 'framer-motion';
import Notes from '../components/notes/Notes.Old';

const NotesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <Notes />
    </motion.div>
  );
};

export default NotesPage;