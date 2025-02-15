import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      //TODO: handle error
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return (
      <div className="flex justify-center items-center  bg-gradient-to-r from-sky-400 via-blue-300 to-orange-500 min-h-[90vh] relative">
         <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-20 mix-blend-overlay"
        style={{
          clipPath:
            "polygon(0% 40%, 15% 50%, 30% 40%, 45% 50%, 60% 40%, 75% 50%, 90% 40%, 100% 50%, 100% 100%, 0% 100%)",
        }}
      ></div>
      
      </div>
    )
  }
  
  if (feed.length <= 0)
  {
    return (
      <div className="flex justify-center items-center  bg-gradient-to-r from-sky-400 via-blue-300 to-orange-500 min-h-[90vh] relative font-bold text-3xl">
      <div
     className="absolute top-0 left-0 w-full h-full bg-black opacity-20 mix-blend-overlay"
     style={{
       clipPath:
         "polygon(0% 40%, 15% 50%, 30% 40%, 45% 50%, 60% 40%, 75% 50%, 90% 40%, 100% 50%, 100% 100%, 0% 100%)",
     }}
   ></div>
        No new users found
      </div>
    );
  }
   

  return (
    feed && (
      <div className="flex justify-center items-center  bg-gradient-to-r from-sky-400 via-blue-300 to-orange-500 min-h-[90vh] relative">
         <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-20 mix-blend-overlay"
        style={{
          clipPath:
            "polygon(0% 40%, 15% 50%, 30% 40%, 45% 50%, 60% 40%, 75% 50%, 90% 40%, 100% 50%, 100% 100%, 0% 100%)",
        }}
      ></div >
        <UserCard user={feed[0]} />
      </div>
    )
  );
};
export default Feed;