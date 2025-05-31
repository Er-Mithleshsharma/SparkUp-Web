import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { emptyFeed } from "../utils/feedSlice";
import { FiUsers } from "react-icons/fi";
import { IoMdLogOut, IoMdHome } from "react-icons/io";
import { MdKeyboardArrowDown, MdPerson } from "react-icons/md";
import { RiRobot2Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import AIChat from "./AIChat";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  const [showChat, setShowChat] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const hiddenNavPaths = ["/login", "/signup"];
    setShowNav(!hiddenNavPaths.includes(location.pathname));
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(emptyFeed());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

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

  if (!showNav) return null;

  return (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="bg-black shadow-md py-3 px-6 flex items-center justify-between text-white">
          <Link
            to={user ? "/" : "/login"}
            className="text-2xl font-semibold text-blue-400 hover:text-blue-300 flex gap-1 items-center"
          >
            <img className="h-12" src="\logo_noBg.png" alt="" /> 
            <p>SparkUp</p>
          </Link>

          {user && (
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setShowChat(true)}
                className="flex items-center text-gray-300 hover:text-blue-300 transition"
                title="AI Assistant"
              >
                <RiRobot2Line size={22} />
                <span className="ml-2">AI Assistant</span>
              </button>

              <Link
                to="/connections"
                className="flex items-center text-gray-300 hover:text-blue-300 transition"
              >
                <FiUsers size={22} />
                <span className="ml-2">Connections</span>
              </Link>

              <div className="relative z-[9999]" ref={dropdownRef}>
                <button
                  className="flex items-center space-x-2 hover:bg-gray-800 px-3 py-2 rounded-lg transition"
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                  <img
                    src={user.photoUrl}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border border-gray-600 object-cover"
                  />
                  <span>{user.firstName}</span>
                  <MdKeyboardArrowDown size={20} />
                </button>

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
      )}

      {/* Mobile Bottom Navigation */}
      {isMobile && user && (
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex justify-around items-center py-3 z-50">
          <Link
            to="/"
            className="flex flex-col items-center text-gray-300 hover:text-blue-400 transition"
          >
            <IoMdHome size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <button
            onClick={() => setShowChat(true)}
            className="flex flex-col items-center text-gray-300 hover:text-blue-400 transition"
          >
            <RiRobot2Line size={24} />
            <span className="text-xs mt-1">AI</span>
          </button>

          <Link
            to="/connections"
            className="flex flex-col items-center text-gray-300 hover:text-blue-400 transition"
          >
            <FiUsers size={24} />
            <span className="text-xs mt-1">Connections</span>
          </Link>

          <Link
            to="/profile"
            className="flex flex-col items-center text-gray-300 hover:text-blue-400 transition"
          >
            <MdPerson size={24} />
            <span className="text-xs mt-1">Profile</span>
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex flex-col items-center text-gray-300 hover:text-blue-400 transition"
            >
              <IoSettingsOutline size={24} />
              <span className="text-xs mt-1">More</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute bottom-full mb-2 right-0 w-48 bg-[#1f2937] shadow-lg rounded-md py-2">
                <ul className="text-sm text-gray-300">
                  <li>
                    <Link
                      to="/requests"
                      className="block px-4 py-2 hover:bg-gray-700 rounded-t-md"
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

      {/* AI Chat Component */}
      {showChat && <AIChat onClose={() => setShowChat(false)} />}
    </>
  );
};

export default NavBar;