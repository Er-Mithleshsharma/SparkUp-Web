import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
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
            Connection Requests
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

                {/* Right Section: Buttons Shimmer */}
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <div className="h-10 w-20 bg-gray-700/50 rounded-lg"></div>
                  <div className="h-10 w-20 bg-gray-700/50 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gradient-to-r from-sky-400 via-blue-300 to-orange-500 p-6">
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
            No Requests Found
          </h1>
          {/* Subtext */}
          <p className="text-gray-500">
            It looks like you don't have any connection requests at the moment.
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
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Connection Requests
        </h1>
        <div className="space-y-4 px-4 max-w-4xl mx-auto">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              request.fromUserId;

            return (
              <div
                key={_id}
                className="bg-gray-800/90 backdrop-blur-lg rounded-xl hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col md:flex-row items-center justify-between border border-gray-700/50 shadow-sm transform hover:scale-[1.02]"
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

                {/* Right Section: Accept and Reject Buttons */}
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <button
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 shadow-sm hover:shadow-md"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-sm hover:shadow-md"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;