import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-sky-400 via-blue-300 to-orange-500 relative py-10 overflow-hidden">
        {/* Background Blobs */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-black opacity-20 mix-blend-overlay"
          style={{
            clipPath:
              "polygon(0% 40%, 15% 50%, 30% 40%, 45% 50%, 60% 40%, 75% 50%, 90% 40%, 100% 50%, 100% 100%, 0% 100%)",
          }}
        ></div>
  
        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Connections
          </h1>
          <div className="space-y-4 px-4 max-w-4xl mx-auto">
            {/* Shimmer Cards */}
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800/90 backdrop-blur-lg rounded-xl p-6 flex flex-col md:flex-row items-center justify-between border border-gray-700/50 shadow-sm animate-pulse"
              >
                {/* Left Section: Photo, Name, and Details */}
                <div className="flex items-center space-x-4">
                  {/* Profile Image Shimmer */}
                  <div className="w-16 h-16 rounded-full bg-gray-700/50 border-2 border-gray-700/50"></div>
                  {/* Name and Details Shimmer */}
                  <div className="space-y-2">
                    <div className="h-5 w-32 bg-gray-700/50 rounded"></div>
                    <div className="h-4 w-24 bg-gray-700/50 rounded"></div>
                    <div className="h-3 w-40 bg-gray-700/50 rounded"></div>
                  </div>
                </div>
  
                {/* Right Section: Button Shimmer */}
                <div className="mt-4 md:mt-0">
                  <div className="h-10 w-20 bg-gray-700/50 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[90vh]  bg-gradient-to-r from-sky-400 via-blue-300 to-orange-500  p-6">
        <div className="text-center">
          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M5.636 5.636l3.536 3.536m0 5.656l-3.536 3.536M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-7a3 3 0 100-6 3 3 0 000 6z"
            />
          </svg>
          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            No Connections Found
          </h1>
          {/* Subtext */}
          <p className="text-gray-500">
            It looks like you don't have any connections yet. Start building your
            network!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-400 via-blue-300 to-orange-500 relative py-10 overflow-hidden">
    {/* Background Blobs */}
    <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-20 mix-blend-overlay"
        style={{
          clipPath:
            "polygon(0% 40%, 15% 50%, 30% 40%, 45% 50%, 60% 40%, 75% 50%, 90% 40%, 100% 50%, 100% 100%, 0% 100%)",
        }}
      ></div >
  
    {/* Content */}
    <div className="relative z-10">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
        Connections
      </h1>
      <div className="space-y-4 px-4 max-w-4xl mx-auto">
        {connections.map((connection) => {
          if (!connection) return null;
  
          const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
  
          return (
            <div
              key={_id}
              className="bg-gray-800/90 backdrop-blur-lg rounded-xl  transition-shadow duration-300 p-6 flex flex-col md:flex-row items-center justify-between border border-gray-700/50 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
            >
              {/* Left Section: Photo, Name, and Details */}
              <div className="flex items-center space-x-4">
                {/* Profile Image */}
                <img
                  alt="profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-700/50 shadow-sm"
                  src={photoUrl}
                />
                {/* Name and Details */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-100">
                    {firstName} {lastName}
                  </h2>
                  {(age || gender) && (
                    <p className="text-sm text-gray-300">
                      {age && `${age} years`} {gender && `• ${gender}`}
                    </p>
                  )}
                  {about && (
                    <p className="text-gray-400 text-sm mt-1">{about}</p>
                  )}
                </div>
              </div>
  
              {/* Right Section: Chat Button */}
              <Link to={"/chat/" + _id}>
                <button className="mt-4 md:mt-0 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-colors duration-300 shadow-sm hover:shadow-md">
                  Chat
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  );
};

export default Connections;