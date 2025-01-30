import React from 'react';

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[280px] md:max-w-[320px] lg:max-w-[360px] xl:max-w-[400px] transform transition-all hover:scale-105">
      {/* Name Section Above Image */}
      <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <h2 className="text-lg md:text-xl font-bold mb-1">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p className="text-sm font-medium">
            {age}, {gender}
          </p>
        )}
      </div>

      {/* User Image */}
      <figure className="relative h-56 md:h-64 lg:h-72 xl:h-80">
        <img
          src={photoUrl || "https://via.placeholder.com/400"}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex justify-center gap-3">
            <button className="p-2 md:p-3 bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-all transform hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6 text-white"
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
            <button className="p-2 md:p-3 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </figure>

      {/* About Section Below Image */}
      <div className="p-4 min-h-[80px] md:min-h-[100px]">
        <p className="text-sm text-gray-700 break-words whitespace-normal">
          {about}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
