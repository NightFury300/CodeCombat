import React from "react";

const HomeTopCard = ({ title, description, buttonLabel, color, fileUrl }) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-6 border-4 border-black flex flex-col min-h-[200px] transition-all hover:scale-105 hover:shadow-xl">
      {/* Title */}
      <h2 className="text-xl font-bold text-blue-400 mb-1">{title}</h2>

      {/* Description */}
      <div className="flex-1 flex items-center mb-4">
        <p className="text-gray-200 mt-2">{description}</p>
      </div>

      {/* Download Button */}
      <a href={fileUrl} download className="mt-auto">
        <button
          className={`px-4 py-2 w-full text-white font-semibold rounded-lg transition-all shadow-md bg-${color || "yellow"}-500 hover:bg-${color || "yellow"}-600 hover:shadow-lg focus:ring-2 focus:ring-${color}-300 focus:outline-none`}
        >
          {buttonLabel}
        </button>
      </a>
    </div>
  );
};

export default HomeTopCard;
