import { useState } from "react";
import { Link } from "react-router";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../reduxSlice/userSlice";
import { getDatabase, ref, set } from "firebase/database";

const SignIn = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const db = getDatabase();
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
            dispatch(userLoginInfo(user));
            navigate("/");
            console.log(user);
          } else {
            toast.error("Please verify your email first");
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

  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        set(ref(db, "usersList/" + user.uid), {
          username: user.displayName,
          email: user.email,
        })
          .then(() => {
            dispatch(userLoginInfo(user));
            toast.success("Welcome to SwiftTalk");
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
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

        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label className="block mb-1 text-md font-semibold text-white">
              Email
            </label>
            <input
              value={userInfo.email}
              onChange={handleEmail}
              type="email"
              className="w-full px-4 py-2 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-md font-semibold text-white">
              Password
            </label>
            <input
              value={userInfo.password}
              onChange={handlePassword}
              type="password"
              className="w-full px-4 py-2 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
              placeholder="••••••••"
            />
            <div className="flex justify-end mt-2">
              <Link
                to="/forgot-password"
                className="text-md text-gray-400 hover:text-white border border-gray rounded-lg my-2 p-2 transition"
              >
                Forgot Password ?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-2.5 rounded-lg hover:bg-gray-300 hover:text-black shadow transition duration-300 cursor-pointer"
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
        <p className="text-center text-md text-white mt-6 animate-fade-in delay-200 mb-4">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-gray-300 hover:text-gray-100 hover:text-lg transition-all font-semibold"
          >
            Sign Up here
          </Link>
        </p>
        <button
          onClick={handleGoogleSignIn}
          style={{
            backgroundColor: "white",
            color: "black",
            border: "1px solid #ddd",
            padding: "10px 20px",
            borderRadius: "20px",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            margin: "auto",
          }}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
