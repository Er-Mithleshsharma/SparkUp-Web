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

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-50 p-6">
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Connection Requests
      </h1>
      <div className="space-y-4 px-4 max-w-4xl mx-auto">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

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

              {/* Right Section: Accept and Reject Buttons */}
              <div className="flex space-x-4 mt-4 md:mt-0">
                <button
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
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
  );
};

export default Requests;