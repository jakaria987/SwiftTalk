import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "./Sidebar.css";
import {
  FaHome,
  FaEnvelope,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userLoginInfo } from "../reduxSlice/UserSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Sidebar = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userLogin.value);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          userLoginInfo({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(userLoginInfo(null));
        navigate("/sign-in");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/sign-in");
      })
      .catch((error) => {
        toast.error("Please verify your email first");
        console.log(error);
      });
  };

  return (
    <div className="sidebar">
      <h1 className="text-white text-xl py-4 px-2">
        Hello, {user && user.name}
      </h1>
      <ul className="sidebar-list">
        <li>
          <FaHome className="icon" />
          <span className="item-text">Home</span>
        </li>
        <li>
          <FaEnvelope className="icon" />
          <span className="item-text">Message</span>
        </li>
        <li>
          <FaBell className="icon" />
          <span className="item-text">Notification</span>
        </li>
        <li>
          <FaCog className="icon" />
          <span className="item-text">Settings</span>
        </li>
      </ul>

      <button onClick={handleSignOut}>
        <div className="logout">
          <FaSignOutAlt className="icon" />
          <span className="logout-text">Logout</span>
        </div>
      </button>
    </div>
  );
};

export default Sidebar;
