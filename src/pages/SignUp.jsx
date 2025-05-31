import { useState } from "react";
import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import {auth } from "../firebase.config";
import { useNavigate } from "react-router";


const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleName = (e) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        name: e.target.value,
      };
    });
  };
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
  const handleSignUp = (e) => {
    e.preventDefault();

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      toast.error("You must provide information in all fields");
    } else if (!emailRegex.test(userInfo.email)) {
      toast.error("Invalid email address");
    } else if (!passwordRegex.test(userInfo.password)) {
      toast.error(
        "Password must contain at least one uppercase, one lowercase letter, and be at least 6 characters long."
      );
    } else {
      createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser).then(() => {
            updateProfile(auth.currentUser, {
              displayName: userInfo.name,
            })
              .then(() => {
                const user = userCredential.user;
                toast.success("Signed Up Successfully");
                console.log(user);
                navigate("/sign-in");
              })
              .catch((error) => {
                console.log(error);
              });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          // const errorMessage = error.message;
          if (errorCode.includes("auth/email-already-in-use")) {
            toast.error("Email already exist, try another one");
            setUserInfo({
              name: "",
              email: "",
              password: "",
            });
          }
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
      <Toaster position="top-right" reverseOrder={true} />
      <div className="bg-gray-950 text-white border border-white rounded-3xl p-8 w-full max-w-md shadow-lg transition duration-300 hover:bg-black">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-white mb-2 animate-fade-in">
            SwiftTalk 💬
          </h1>
          <p className="text-white italic animate-fade-in delay-100">
            Connect, chat & build your network instantly.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block mb-1 text-md font-semibold text-white ">
              Username
            </label>
            <input
              onChange={handleName}
              value={userInfo.name}
              type="text"
              className="w-full px-4 py-2 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block mb-1 text-md font-semibold text-white">
              Email
            </label>
            <input
              onChange={handleEmail}
              value={userInfo.email}
              type="text"
              className="w-full px-4 py-2 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
              placeholder="someone@gmail.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-md font-semibold text-white">
              Password
            </label>
            <input
              onChange={handlePassword}
              value={userInfo.password}
              type="password"
              className="w-full px-4 py-2 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-2.5 rounded-lg hover:bg-gray-300 hover:text-black shadow transition duration-300"
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
            Sign Up & Start Chatting
          </button>
        </form>

        <p className="text-center text-md text-white font-bold mt-6 animate-fade-in delay-200">
          Already a member?{" "}
          <Link
            to="/sign-in"
            className="text-gray-300 hover:text-gray-100 hover:text-lg transition-all font-semibold"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
