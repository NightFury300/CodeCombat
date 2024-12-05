import React from "react";

const HomeBottomCard = ({ title, options, color }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 border-t-4 border-${color}-500 flex flex-col min-h-[300px]`}
    >
      {/* Title */}
      <h3 className={`text-xl font-bold text-${color}-500 mb-4`}>{title}</h3>

      {/* Spacer for consistent alignment */}
      <div className="flex-grow"></div>

      {/* Buttons */}
      <div className="w-full">
        {options.map((option, index) => (
          <button
            key={index}
            className={`mt-4 w-full bg-transparent border  text-${color}-500 px-4 py-2 rounded hover:bg-yellow-200 ${
              index === options.length - 1 && "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeBottomCard;
