import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStickyNote, FaArrowRight } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [notesFlying, setNotesFlying] = useState([]);

  // Create flying notes animation
  useEffect(() => {
    const colors = ["text-yellow-300", "text-pink-300", "text-blue-300", "text-green-300", "text-purple-300"];
    const interval = setInterval(() => {
      if (notesFlying.length < 8) { // Limit number of notes
        setNotesFlying(prev => [
          ...prev,
          {
            id: Date.now(),
            color: colors[Math.floor(Math.random() * colors.length)],
            left: Math.random() * 100,
            delay: Math.random() * 2,
            size: Math.random() * 20 + 10
          }
        ]);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [notesFlying.length]);

  // Remove notes after animation
  useEffect(() => {
    if (notesFlying.length > 8) {
      setNotesFlying(prev => prev.slice(1));
    }
  }, [notesFlying]);

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-black to-orange-950 overflow-hidden mt-2 mb-2 rounded-2xl">
      {/* Animated background notes */}
      {notesFlying.map(note => (
        <motion.div
          key={note.id}
          initial={{ 
            y: -50,
            x: `${note.left}vw`,
            opacity: 0,
            rotate: Math.random() * 60 - 30
          }}
          animate={{ 
            y: "100vh",
            opacity: [0, 1, 0],
            rotate: note.rotate + 180
          }}
          transition={{ 
            duration: 8,
            delay: note.delay,
            ease: "linear"
          }}
          onAnimationComplete={() => setNotesFlying(prev => prev.filter(n => n.id !== note.id))}
          className={`absolute text-${note.color} text-${Math.round(note.size)}xl`}
          style={{ left: `${note.left}%` }}
        >
          <FaStickyNote />
        </motion.div>
      ))}

      <div className="text-center space-y-8 z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400 mb-2">
            NoteSphere
          </h1>
          <p className="text-xl text-gray-300">
            Your thoughts, beautifully organized
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-green-100 mb-6">
            Wanna see your notes???...
          </h2>
          
          <motion.button
            onClick={() => navigate("/notes")}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden px-8 py-4 rounded-xl
            text-white font-bold bg-gradient-to-r from-blue-500
            to-purple-600 shadow-2xl transition-all duration-300
            hover:shadow-lg hover:from-blue-600 hover:to-purple-700"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              I have your Notes
              <motion.span
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <FaArrowRight />
              </motion.span>
            </span>
            <motion.span
              className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"
            />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-gray-400 mt-8 text-sm"
        >
          <p>Your notes will be remembered</p>
        </motion.div>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: 0
          }}
          animate={{
            y: [0, Math.random() * 50 - 25],
            opacity: [0, 0.3, 0],
            x: [0, Math.random() * 50 - 25]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 5
          }}
          className={`absolute rounded-full w-1 h-1 ${
            ["bg-blue-400", "bg-purple-400", "bg-green-400"][i % 3]
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );
}