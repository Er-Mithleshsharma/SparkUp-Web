import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
  const isLoggedIn = useSelector((store) => store.user);
  console.log(isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [location.pathname,isLoggedIn]);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Gradient Background with Sparkup Text (Hidden on Small Screens) */}
      <div className="hidden sm:flex w-1/2 bg-gradient-to-r from-sky-400 via-blue-300 to-orange-500 items-center justify-center relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-20 mix-blend-overlay"
        style={{
          clipPath:
            "polygon(0% 40%, 15% 50%, 30% 40%, 45% 50%, 60% 40%, 75% 50%, 90% 40%, 100% 50%, 100% 100%, 0% 100%)",
        }}
      ></div>
      <h1 className="text-8xl font-extrabold text-white font-poppins text-center z-10">
        Welcome To Sparkup
      </h1>
    </div>

      {/* Right Side - Login/Signup Form (Always Visible, Centered on Small Screens) */}
      <div className="w-full sm:w-1/2 flex items-center justify-center bg-transparent p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center">
          <img className="h-48" src="\logo_noBg.png" alt="" />
          </div>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            {isLoginForm ? "Welcome Back!" : "Create an Account"}
          </h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          {!isLoginForm && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
          )}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Email ID
            </label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-4 relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-7"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />} {/* Toggle eye icon */}
            </button>
          </div>
          <button
            onClick={isLoginForm ? handleLogin : handleSignUp}
            className="w-full mt-6 bg-gradient-to-r from-sky-400 via-blue-300 to-orange-500 text-white py-2 px-4 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-500 hover:via-blue-300 hover:to-sky-400 focus:outline-none focus:ring-2 focus:ring-blue-500"

          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>
          <p className="mt-4 text-center text-gray-600">
            {isLoginForm ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLoginForm((value) => !value)}
              className="text-blue-400 hover:text-blue-600 font-semibold focus:outline-none"
            >
              {isLoginForm ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;