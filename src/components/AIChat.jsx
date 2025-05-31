// src/components/AIChat.js
import { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import model from "../utils/model";

const AIChat = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hey there, friend! 👋 I'm Sparky, your virtual buddy. How's your day going? 😊",
      sender: "ai",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateFriendlyPrompt = (userInput) => {
    return `You're Sparky, a friendly, enthusiastic AI buddy. You talk like a close friend - warm, supportive, and slightly playful. Use emojis occasionally to express emotions. Keep responses conversational and natural, like you're texting a friend. if the user talks in hinglish you should also talk in hinglish. The user said: "${userInput}"`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const friendlyPrompt = generateFriendlyPrompt(input);
      const result = await model.generateContent(friendlyPrompt);
      const response = await result.response;
      const text = response.text();
      
      setMessages((prev) => [...prev, { text, sender: "ai" }]);
    } catch (error) {
      console.error("Error generating content:", error);
      setMessages((prev) => [
        ...prev,
        { 
          text: "Oopsie! 😅 My circuits got a little tangled there. Could you say that again, pal?", 
          sender: "ai" 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-gray-800 rounded-lg shadow-xl border border-gray-700 flex flex-col z-[9999]">
      <div className="bg-gray-900 text-white p-3 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-2">
            <span className="text-black font-bold">S</span>
          </div>
          <h3 className="font-semibold">Sparky - Your Buddy</h3>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <IoClose size={20} />
        </button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto max-h-96">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-3 p-3 rounded-lg ${
              message.sender === "user"
                ? "bg-blue-600 text-white ml-auto max-w-xs"
                : "bg-gray-700 text-gray-200 mr-auto max-w-xs"
            }`}
          >
            {message.text}
          </div>
        ))}
        
        {isLoading && (
          <div className="mb-3 p-3 rounded-lg bg-gray-700 text-gray-200 mr-auto max-w-xs">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-700">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message, friend..."
            className="flex-1 bg-gray-700 text-white rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg py-2 px-4 disabled:opacity-50"
          >
            <FiSend size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChat;