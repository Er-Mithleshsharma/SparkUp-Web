import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });

      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (error) {
      console.error("Error verifying premium status:", error);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "SparkUp",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: { color: "#F37254" },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  if (isUserPremium) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800">🎉 You are already a Premium Member!</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Enjoy all the exclusive features and perks that come with your premium membership.
        </p>
      </div>
    </div>
    );
  }

  return ( 
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
        Upgrade to Premium
      </h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl">
        Unlock exclusive features and connect with developers like never before.
      </p>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Silver Membership */}
        <div className="bg-white bg-opacity-70 backdrop-blur-md shadow-xl rounded-xl p-8 border border-gray-200 hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Silver Membership
          </h2>
          <ul className="mt-4 text-gray-600 space-y-2 text-lg">
            <li>✅ Chat with other people</li>
            <li>✅ 100 Connection Requests per day</li>
            <li>✅ Blue Tick</li>
            <li>✅ Valid for 3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300"
          >
            Buy Silver
          </button>
        </div>

        {/* Gold Membership */}
        <div className="bg-white bg-opacity-70 backdrop-blur-md shadow-xl rounded-xl p-8 border border-gray-200 hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Gold Membership
          </h2>
          <ul className="mt-4 text-gray-600 space-y-2 text-lg">
            <li>✅ Chat with other people</li>
            <li>✅ Unlimited Connection Requests per day</li>
            <li>✅ Blue Tick</li>
            <li>✅ Valid for 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
