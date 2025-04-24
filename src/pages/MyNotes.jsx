import { motion, AnimatePresence } from "framer-motion";
import { Edit, Edit2, Edit2Icon, Trash, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const dummyNotes = [
  {
    id: 1,
    title: "Meeting Notes",
    content: "Discuss project milestones and assign team roles.",
    category: "Work",
    tags: ["meeting", "project"],
  },
  {
    id: 2,
    title: "Grocery List",
    content: "Milk, Eggs, Bread, Tea, Apples",
    category: "Personal",
    tags: ["shopping", "errands"],
  },
  {
    id: 3,
    title: "JS Tips",
    content: "Use optional chaining to avoid null errors.",
    category: "Learning",
    tags: ["javascript", "tips"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

export default function MyNotes() {
  const [notes, setNotes] = useState(dummyNotes);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  // Close modal on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    }
    if (showModal) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const form = e.target;
    const newNote = {
      id: Date.now(),
      title: form.title.value,
      content: form.content.value,
      category: form.category.value,
      tags: form.tags.value.split(",").map((tag) => tag.trim()),
    };
    setNotes((prev) => [newNote, ...prev]);
    setShowModal(false);
    form.reset();
  };

  return (
    <div className="bg-gray-300 h-screen">
      <div className="p-6 max-w-6xl mx-auto relative">
        <h2 className="text-3xl text-center font-bold mb-12 text-gray-800">My Notes</h2>

        {/* Create Button */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-6 right-6 bg-stone-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-stone-700 transition cursor-pointer"
        >
          ➕ Create
        </button>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 backdrop-blur-lg bg-opacity-40 flex justify-center items-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                ref={modalRef}
                className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Create a New Note
                </h3>
                <form onSubmit={handleCreate} className="space-y-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                    className="w-full border border-stone-300 p-2 rounded-lg"
                  />
                  <textarea
                    name="content"
                    placeholder="Content"
                    required
                    className="w-full border border-stone-300 p-2 rounded-lg"
                  />
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    required
                    className="w-full border border-stone-300 p-2 rounded-lg"
                  />
                  <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma separated)"
                    className="w-full border border-stone-300 p-2 rounded-lg"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-stone-500 text-white px-4 py-2 rounded-lg hover:bg-stone-700 cursor-pointer" 
                    >
                      Save Note
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              className="bg-gray-100 rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow border border-stone-300"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {note.title}
              </h3>
              <p className="text-gray-600 mb-3">{note.content}</p>
              <div className="text-sm text-stone-500 mb-1">
                Category: <span className="italic">{note.category}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {note.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-stone-200 text-stone-700 px-2 py-1 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="text-sm text-white bg-stone-300 px-3 py-2 rounded hover:bg-stone-500 cursor-pointer"
                  onClick={() => alert("Edit functionality coming soon!")}
                >
                  <Edit2/>
                </button>
                <button
                  className="text-sm text-white bg-stone-500 px-3 py-2 rounded hover:bg-stone-700 cursor-pointer"
                  onClick={() => handleDelete(note.id)}
                >
                  <Trash2 />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
