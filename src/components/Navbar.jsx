import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { emptyFeed } from "../utils/feedSlice";
import { FiUsers } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md"; // Arrow icon for dropdown
const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(emptyFeed());
      return navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#111827] shadow-md py-3 px-6 flex items-center justify-between text-white">
      {/* Logo */}
      <Link
        to={user ? "/" : "/login"}
        className="text-2xl font-semibold text-blue-400 hover:text-blue-300 flex gap-1 items-center"
      >
        <img className="h-12" src="\logo_noBg.png" alt="" /> <p>SparkUp</p>
      </Link>

      {user && (
        <div className="flex items-center space-x-6">
          {/* Connections Icon */}
          <Link
            to="/connections"
            className="flex items-center text-gray-300 hover:text-blue-300 transition"
          >
            <FiUsers size={22} />
            <span className="ml-2 hidden sm:inline">Connections</span>
          </Link>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-2 hover:bg-gray-800 px-3 py-2 rounded-lg transition"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={user.photoUrl}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border border-gray-600 object-cover"
              />
              <span className="hidden sm:inline">{user.firstName}</span>
              <MdKeyboardArrowDown size={20} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-[#1f2937] shadow-lg rounded-md py-2">
                <ul className="text-sm text-gray-300">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-700 rounded-t-md"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/requests"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Requests
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/premium"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Premium
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 hover:bg-red-600 text-red-400 hover:text-white transition rounded-b-md"
                    >
                      <IoMdLogOut size={18} className="mr-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
