import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import EmojiPicker from "emoji-picker-react"; // Install this package: npm install emoji-picker-react

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isOnline, setIsOnline] = useState(false); // Track online status
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null); // Ref for the message container

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text, createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        createdAt: new Date(createdAt).toLocaleTimeString(),
      };
    });
    setMessages(chatMessages);
  };

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();

    // Notify server that the user is online
    socket.emit("userOnline", userId);

    // Listen for online status updates
    socket.on("onlineStatus", ({ userId: targetId, isOnline: status }) => {
      if (targetId === targetUserId) {
        setIsOnline(status);
      }
    });

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, createdAt }) => {
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text, createdAt: new Date(createdAt).toLocaleTimeString() },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return; // Don't send empty messages
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
    setShowEmojiPicker(false); // Close emoji picker after sending
  };

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      {/* Chat Container */}
      <div className="w-full max-w-4xl h-[85vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">CHATS</h1>
          <div className="flex items-center space-x-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isOnline ? "bg-green-400" : "bg-gray-400"
              }`}
            ></span>
            <span className="text-sm text-white">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                user.firstName === msg.firstName ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md p-4 rounded-xl ${
                  user.firstName === msg.firstName
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800 shadow-sm"
                }`}
              >
                <div className="font-semibold">
                  {msg.firstName} {msg.lastName}
                </div>
                <div className="mt-1 text-sm">{msg.text}</div>
                <div className="text-xs mt-2 opacity-70">{msg.createdAt}</div>
              </div>
            </div>
          ))}
          {/* Empty div to act as a scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white p-4 border-t border-gray-200 relative">
          <div className="flex items-center space-x-2">
            {/* Emoji Picker Button */}
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-gray-500 hover:text-blue-500 transition duration-200"
            >
              😊
            </button>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-16 left-4 z-10">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  height={350}
                  width={300}
                />
              </div>
            )}

            {/* Input Field */}
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />

            {/* Send Button */}
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;