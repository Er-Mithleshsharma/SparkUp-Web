import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const cardRef = useRef(null);

  const SWIPE_THRESHOLD = 100;
  const ROTATION_FACTOR = 0.1;
  const OPACITY_FACTOR = 0.005;

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartPos({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    
    // Limit horizontal movement to prevent overflow
    const maxX = window.innerWidth * 0.4; // Limit to 40% of screen width
    const constrainedX = Math.max(-maxX, Math.min(maxX, deltaX));
    
    // Calculate rotation based on horizontal movement
    const newRotation = constrainedX * ROTATION_FACTOR;
    
    // Calculate opacity based on distance from center
    const distance = Math.abs(constrainedX);
    const newOpacity = Math.max(0.5, 1 - (distance * OPACITY_FACTOR));
    
    setPosition({ x: constrainedX, y: deltaY });
    setRotation(newRotation);
    setOpacity(newOpacity);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const distance = Math.abs(position.x);
    
    if (distance > SWIPE_THRESHOLD) {
      // Determine swipe direction and handle action
      const action = position.x > 0 ? "interested" : "ignored";
      handleSwipeAction(action, position.x > 0 ? 1 : -1);
    } else {
      // Return to center with smooth animation
      resetCardPosition();
    }
    
    setIsDragging(false);
  };

  // Touch events for mobile
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartPos({
      x: touch.clientX,
      y: touch.clientY
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.x;
    const deltaY = touch.clientY - startPos.y;
    
    // Limit horizontal movement to prevent overflow
    const maxX = window.innerWidth * 0.4; // Limit to 40% of screen width
    const constrainedX = Math.max(-maxX, Math.min(maxX, deltaX));
    
    const newRotation = constrainedX * ROTATION_FACTOR;
    const distance = Math.abs(constrainedX);
    const newOpacity = Math.max(0.5, 1 - (distance * OPACITY_FACTOR));
    
    setPosition({ x: constrainedX, y: deltaY });
    setRotation(newRotation);
    setOpacity(newOpacity);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const distance = Math.abs(position.x);
    
    if (distance > SWIPE_THRESHOLD) {
      const action = position.x > 0 ? "interested" : "ignored";
      handleSwipeAction(action, position.x > 0 ? 1 : -1);
    } else {
      resetCardPosition();
    }
    
    setIsDragging(false);
  };

  const handleSwipeAction = async (action, direction) => {
    const userId = feed[currentIndex]._id;
    
    // Animate card off screen (but within viewport bounds)
    const offScreenX = direction * (window.innerWidth * 0.8);
    setPosition({ x: offScreenX, y: position.y });
    setRotation(direction * 30);
    setOpacity(0);
    
    try {
      await axios.post(
        `${BASE_URL}/request/send/${action}/${userId}`,
        {},
        { withCredentials: true }
      );
      
      // Wait for animation to complete before updating state
      setTimeout(() => {
        dispatch(removeUserFromFeed(userId));
        setCurrentIndex(prev => prev + 1);
        resetCardPosition();
      }, 300);
      
    } catch (err) {
      console.error("Error sending request:", err);
      resetCardPosition();
    }
  };

  const resetCardPosition = () => {
    setPosition({ x: 0, y: 0 });
    setRotation(0);
    setOpacity(1);
  };

  // Button handlers for manual actions
  const handleReject = () => {
    if (isDragging) return;
    handleSwipeAction("ignored", -1);
  };

  const handleLike = () => {
    if (isDragging) return;
    handleSwipeAction("interested", 1);
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Global mouse event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        handleMouseMove(e);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, position, startPos]);

  if (!feed) {
    return (
      <div className="flex justify-center items-center bg-gradient-to-r from-sky-400 via-blue-300 to-orange-500 min-h-[90vh] relative">
        <div
          className="absolute top-0 left-0 w-full h-full bg-black opacity-20 mix-blend-overlay"
          style={{
            clipPath:
              "polygon(0% 40%, 15% 50%, 30% 40%, 45% 50%, 60% 40%, 75% 50%, 90% 40%, 100% 50%, 100% 100%, 0% 100%)",
          }}
        ></div>
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (feed.length <= 0 || currentIndex >= feed.length) {
    return (
      <div className="flex justify-center items-center bg-gradient-to-r from-sky-400 via-blue-300 to-orange-500 min-h-[90vh] relative font-bold text-3xl">
        <div
          className="absolute top-0 left-0 w-full h-full bg-black opacity-20 mix-blend-overlay"
          style={{
            clipPath:
              "polygon(0% 40%, 15% 50%, 30% 40%, 45% 50%, 60% 40%, 75% 50%, 90% 40%, 100% 50%, 100% 100%, 0% 100%)",
          }}
        ></div>
        <div className="text-white z-10">No new users found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-r from-sky-400 via-blue-300 to-orange-500 min-h-[90vh] relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-20 mix-blend-overlay"
        style={{
          clipPath:
            "polygon(0% 40%, 15% 50%, 30% 40%, 45% 50%, 60% 40%, 75% 50%, 90% 40%, 100% 50%, 100% 100%, 0% 100%)",
        }}
      ></div>
      
      {/* Card Stack */}
      <div className="relative z-10 w-full max-w-sm mx-auto px-4">
        {/* Show next card behind current card */}
        {currentIndex + 1 < feed.length && (
          <div 
            className="absolute inset-0 transform scale-95 -z-10 overflow-hidden"
            style={{ filter: 'brightness(0.8)' }}
          >
            <UserCard user={feed[currentIndex + 1]} />
          </div>
        )}
        
        {/* Current card */}
        <div 
          ref={cardRef}
          className="relative select-none overflow-hidden"
          style={{
            transform: `translateX(${position.x}px) translateY(${position.y}px) rotate(${rotation}deg)`,
            opacity: opacity,
            transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <UserCard user={feed[currentIndex]} />
          
          {/* Swipe indicators */}
          <div 
            className="absolute top-8 left-8 px-4 py-2 rounded-lg font-bold text-2xl border-4 border-green-500 text-green-500 bg-white/90 transform -rotate-12"
            style={{
              opacity: Math.max(0, position.x / 150),
              transform: `rotate(-12deg) scale(${1 + Math.max(0, position.x / 300)})`
            }}
          >
            LIKE
          </div>
          
          <div 
            className="absolute top-8 right-8 px-4 py-2 rounded-lg font-bold text-2xl border-4 border-red-500 text-red-500 bg-white/90 transform rotate-12"
            style={{
              opacity: Math.max(0, -position.x / 150),
              transform: `rotate(12deg) scale(${1 + Math.max(0, -position.x / 300)})`
            }}
          >
            NOPE
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center items-center space-x-8 mt-8 z-10">
        <button
          onClick={handleReject}
          className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
          disabled={isDragging}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        
        <button
          onClick={handleLike}
          className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
          disabled={isDragging}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Feed;