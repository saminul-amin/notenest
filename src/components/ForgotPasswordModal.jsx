import { motion } from "framer-motion";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

function ForgotPasswordModal({ onClose }) {
  const modalRef = useRef();
  const { register, handleSubmit, reset } = useForm();
  const { resetPassword } = useAuth();

  const onSubmit = (data) => {
    console.log("Reset email:", data.email);
    resetPassword(data.email).then(() => console.log("Email sent"));
    // reset();
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <motion.div
      ref={modalRef}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Reset Password
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-stone-500 text-white py-2 rounded-lg hover:bg-stone-700 transition cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default ForgotPasswordModal;
