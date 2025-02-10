import React from "react";

const ContactUs = () => {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 min-h-[80vh]">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
      <p className="text-gray-700 mb-2">
        <strong>Company:</strong> SparkUp
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Address:</strong> Urban Estate Phase 1, Jalandhar, Punjab 144022
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Contact:</strong> <a href="tel:9592004177" className="text-blue-600 hover:underline">9592004177</a>
      </p>
      <p className="text-gray-700">
        <strong>Email:</strong> <a href="mailto:itsyour.rohan@gmail.com" className="text-blue-600 hover:underline">itsyour.rohan@gmail.com</a>
      </p>
    </div>
  );
};

export default ContactUs;
