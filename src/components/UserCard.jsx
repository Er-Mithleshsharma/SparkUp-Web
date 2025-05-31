import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[280px] md:max-w-[320px] lg:max-w-[300px] xl:max-w-[340px] transform transition-all">
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

export default UserCard;