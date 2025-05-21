import { useState } from "react";
import { Link } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleEmail = (e) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        email: e.target.value,
      };
    });
  };
  const handlePassword = (e) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        password: e.target.value,
      };
    });
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    if (userInfo.email && userInfo.password) {
      signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user.emailVerified) {
            toast.success("Welcome to SwiftTalk");
            setTimeout(() => navigate("/"), 1500);
            console.log(user);
          }else{
            toast.error("Please verify your email first")
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          if (errorCode.includes("auth/invalid-credential")) {
            toast.error("Something went wrong, check your email or password");
            setUserInfo({
              name: "",
              email: "",
              password: "",
            });
          }
        });
    } else {
      toast.error("Email & Password is required");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 p-4">
      <Toaster position="top-right" reverseOrder={true} />
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 w-full max-w-md transition-transform duration-500 hover:scale-105">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-[#14B8A6] mb-2 animate-fade-in">
            SwiftTalk 🚀
          </h1>
          <p className="text-gray-500 dark:text-gray-300 animate-fade-in delay-100">
            Connect, chat & build your network instantly.
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              value={userInfo.email}
              onChange={handleEmail}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              value={userInfo.password}
              onChange={handlePassword}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition"
              placeholder="••••••••"
            />
            <div className="flex justify-end mt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-700"
          >
            <svg
              className="w-5 h-5 text-white animate-pulse"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M21 16a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h2l2-2h6l2 2h2a2 2 0 012 2z"
              />
            </svg>
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6 animate-fade-in delay-200">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-indigo-400 hover:underline font-semibold"
          >
            Sign Up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
