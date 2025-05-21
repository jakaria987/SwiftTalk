// Sidebar.jsx
import './Sidebar.css';
import { FaHome, FaEnvelope, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
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

      <div className="logout">
        <FaSignOutAlt className="icon" />
        <span className="logout-text">Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
