// src/pages/LandingPage.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
      <motion.h1
        className="text-6xl font-bold mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        180 Days
      </motion.h1>
      <div className="flex gap-8">
        <motion.button
          onClick={() => navigate("/login")}
          className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
          whileTap={{ scale: 0.95 }}
        >
          Returning User
        </motion.button>
        <motion.button
          onClick={() => navigate("/signup")}
          className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
          whileTap={{ scale: 0.95 }}
        >
          New User
        </motion.button>
      </div>
    </div>
  );
}
