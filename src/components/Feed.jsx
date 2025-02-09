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
      <div className="flex h-screen items-center justify-center bg-neutral text-white text-xl font-semibold">
      
      </div>
    )
  }
  
  if (feed.length <= 0)
  {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral text-white text-xl font-semibold">
        No new users found
      </div>
    );
  }
   

  return (
    feed && (
      <div className="flex justify-center items-center  bg-neutral min-h-[90vh]">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};
export default Feed;