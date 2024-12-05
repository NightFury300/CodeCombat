import React from "react";

const HomeTopCard = ({ title, description, buttonLabel, color }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-t-4 border-${color}-500 flex flex-col`}>
      <h2 className={`text-xl font-bold text-${color}-500`}>{title}</h2>
      <p className="text-gray-600 mt-2 flex-grow">{description}</p>
      <button
        className={`mt-4 bg-${color}-500 text-white px-4 py-2 rounded hover:bg-${color}-600 sticky bottom-0 self-start`}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default HomeTopCard;
