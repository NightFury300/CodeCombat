import React, { useState } from 'react';
import { MdSupportAgent } from "react-icons/md";

const HelpPopup = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage popup visibility

  // Function to toggle the popup visibility
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Help Button */}
      <button
        className="fixed bottom-6 right-6 bg-black text-white p-5 rounded-full text-lg hover:bg-gray-700 transition"
        onClick={togglePopup}
      >
        <MdSupportAgent className='w-full h-full'/>
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Help & Support</h2>
              <button
                className="text-lg text-black font-semibold"
                onClick={togglePopup}
              >
                X
              </button>
            </div>
            <div className="mt-4 text-center">
              <p>If you need assistance, please contact us:</p>
              <ul className="mt-4">
                <li>
                  <strong>Phone:</strong> +1 (123) 456-7890
                </li>
                <li>
                  <strong>Email:</strong> support@example.com
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpPopup;
