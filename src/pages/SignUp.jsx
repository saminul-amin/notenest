import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, userGoogleSignIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    createUser(data.email, data.password).then((res) => {
      console.log(res.user);
      navigate("/");
    });
  };

  const handleGoogleSignUp = () => {
    userGoogleSignIn().then(res => {
        console.log(res);
        navigate("/");
    });
  } 

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-stone-100 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create your NoteNest Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 bg-white"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 bg-white"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 bg-white"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-stone-500 hover:bg-stone-700 text-white py-2 rounded-lg font-semibold transition duration-200 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-3 border border-stone-300 py-2 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 488 512"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path
                d="M488 261.8c0-17.8-1.5-35-4.3-51.7H249v97.9h134.1c-5.8 31.2-23.2 57.6-49.4 75.3v62h79.8c46.8-43.1 74.5-106.4 74.5-183.5z"
                fill="#4285F4"
              />
              <path
                d="M249 512c67.6 0 124.3-22.4 165.8-60.8l-79.8-62c-22.2 15-50.7 23.9-86 23.9-66.1 0-122.2-44.5-142.1-104.2H24.1v65.4C65.4 466.2 150.5 512 249 512z"
                fill="#34A853"
              />
              <path
                d="M106.9 308.9c-5.1-15-8.1-31-8.1-47.5s2.9-32.5 8.1-47.5V148H24.1C8.5 181.6 0 219.3 0 261.4s8.5 79.8 24.1 113.4l82.8-65.9z"
                fill="#FBBC04"
              />
              <path
                d="M249 100.7c36.7 0 69.8 12.6 95.8 37.5l71.8-71.8C373.2 24.6 316.5 0 249 0 150.5 0 65.4 45.8 24.1 148l82.8 65.4c19.9-59.7 76-104.2 142.1-104.2z"
                fill="#EA4335"
              />
            </svg>
            <span className="font-medium">Sign up with Google</span>
          </button>
        </div>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-stone-500 hover:text-yellow-700 hover:underline font-medium transition duration-200"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
