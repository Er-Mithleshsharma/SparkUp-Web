import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[280px] md:max-w-[320px] lg:max-w-[300px] xl:max-w-[340px] transform transition-all hover:scale-105">
      <figure className="relative h-[500px] w-full">
        <img
          src={photoUrl || "https://via.placeholder.com/400"}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h2 className="text-2xl font-bold">
            {firstName} {lastName}, <span className="font-normal">{age}</span>
          </h2>
          {gender && <p className="text-lg font-medium mb-2">{gender}</p>}
          {about && (
            <p className="text-sm font-light break-words whitespace-normal pb-4">
              {about}
            </p>
          )}
        </div>
      </figure>
    </div>
  );
};

const UserCardWithButtons = ({ user }) => {
  const dispatch = useDispatch();
  const { _id } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  return (
    <div className="relative w-full max-w-[280px] md:max-w-[320px] lg:max-w-[300px] xl:max-w-[340px]">
      <UserCard user={user} />

      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-50">
        <button
          onClick={() => handleSendRequest("ignored", _id)}
          className="p-3 bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-all transform hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <button
          onClick={() => handleSendRequest("interested", _id)}
          className="p-3 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserCardWithButtons;
