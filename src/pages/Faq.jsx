import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is NoteNest?",
    answer:
      "NoteNest is your personal note management system — designed to help you stay organized with categories, tags, and easy access to your thoughts anytime, anywhere.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "You can reset your password by clicking on 'Forgot Password' on the Sign In page and following the instructions sent to your email.",
  },
  {
    question: "Is NoteNest free to use?",
    answer:
      "Yes, NoteNest is completely free to use. We also offer premium features coming soon for advanced users!",
  },
  {
    question: "Can I access my notes offline?",
    answer:
      "Currently, NoteNest is a web-based app, but offline access is in our roadmap. Stay tuned!",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-300 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-stone-100 shadow-md rounded-xl p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-stone-300 rounded-lg">
              <button
                className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-800 font-medium focus:outline-none hover:bg-gray-200 transition duration-700 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {openIndex === index ? "−" : "+"}
                </motion.span>
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 text-gray-700 bg-stone-50 transition-all duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
