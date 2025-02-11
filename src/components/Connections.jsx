import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

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
      <div className="py-10 bg-gradient-to-r from-blue-50 to-purple-50 ">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Connections
      </h1>
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between animate-pulse max-w-4xl mx-auto mt-8">
        
      {/* Left Section: Photo, Name, and Details */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-300"></div>
        <div>
          <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-3 w-40 bg-gray-200 rounded mt-2"></div>
        </div>
      </div>

      {/* Right Section: Buttons */}
      <div className="flex space-x-4 mt-4 md:mt-0">
        <div className="h-10 w-20 bg-gray-300 rounded"></div>

      </div>
    </div>
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between animate-pulse max-w-4xl mx-auto mt-8">
        
        {/* Left Section: Photo, Name, and Details */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-300"></div>
          <div>
            <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-3 w-40 bg-gray-200 rounded mt-2"></div>
          </div>
        </div>
  
        {/* Right Section: Buttons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <div className="h-10 w-20 bg-gray-300 rounded"></div>
  
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between animate-pulse max-w-4xl mx-auto mt-8">
        
        {/* Left Section: Photo, Name, and Details */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-300"></div>
          <div>
            <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-3 w-40 bg-gray-200 rounded mt-2"></div>
          </div>
        </div>
  
        {/* Right Section: Buttons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <div className="h-10 w-20 bg-gray-300 rounded"></div>
  
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between animate-pulse max-w-4xl mx-auto mt-8">
        
        {/* Left Section: Photo, Name, and Details */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-300"></div>
          <div>
            <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-3 w-40 bg-gray-200 rounded mt-2"></div>
          </div>
        </div>
  
        {/* Right Section: Buttons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <div className="h-10 w-20 bg-gray-300 rounded"></div>
  
        </div>
      </div>
     </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-r from-blue-50 to-purple-50  p-6">
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Connections
      </h1>
      <div className="space-y-4 px-4 max-w-4xl mx-auto">
        {connections.map((connection) => {
         if (!connection) {
          return null; // or return an empty element in React
        }
        
        const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
          
          return (
            <div
              key={_id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col md:flex-row items-center justify-between"
            >
              {/* Left Section: Photo, Name, and Details */}
              <div className="flex items-center space-x-4">
                {/* Profile Image */}
                <img
                  alt="profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-200"
                  src={photoUrl}
                />
                {/* Name and Details */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {firstName} {lastName}
                  </h2>
                  {(age || gender) && (
                    <p className="text-sm text-gray-500">
                      {age && `${age} years`} {gender && `• ${gender}`}
                    </p>
                  )}
                  {about && (
                    <p className="text-gray-600 text-sm mt-1">{about}</p>
                  )}
                </div>
              </div>

              {/* Right Section: View Profile Button */}
              <button className="mt-4 md:mt-0 bg-[#111827] text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300">
               Chat
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;