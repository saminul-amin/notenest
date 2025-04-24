import { motion } from "framer-motion";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <motion.div
      className="bg-gray-300 min-h-screen flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to{" "}
          <span className="bg-gradient-to-l from-stone-500 via-stone-400 to-stone-700 bg-clip-text text-transparent">
            NoteNest
          </span>
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Your notes. Organized, tagged, and always within reach. Start creating
          and managing notes smarter than ever before.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {user?.email ? (
            <Link to="/my-notes">
              <button className="bg-stone-400 hover:bg-stone-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105 cursor-pointer">
                My Notes
              </button>
            </Link>
          ) : (
            <Link to="/sign-up">
              <button className="bg-stone-400 hover:bg-stone-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105 cursor-pointer">
                Get Started
              </button>
            </Link>
          )}

          <Link to="/faq">
            <button className="bg-transparent border border-stone-500 text-stone-600 hover:bg-stone-400 hover:text-white px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105 cursor-pointer">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
