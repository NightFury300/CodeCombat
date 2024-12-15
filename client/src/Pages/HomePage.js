import React from "react";
import HomeTopCard from "../Components/Home/HomeTopCard";
import HomeBottomCard from "../Components/Home/HomeBottomCard";
import { useNavigate } from "react-router-dom";
import { useUser } from '../Contexts/UserContext';
import { FaUser } from "react-icons/fa";
import HelpPopup from '../Components/Help/HelpPopup'
import _75 from '../HomeContent/75sheet.pdf'
import DBMS from '../HomeContent/DBMS.pdf'
import SOFT from '../HomeContent/SOFT.pdf'
import DSA from '../HomeContent/DSA.pdf'
import DSA_ from '../HomeContent/DSA_.pdf'
import CN from '../HomeContent/CN.pdf'

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // Access user context

  const topCardsData = [
    {
      title: "75 Days DSA Sheet",
      description: "A structured 75-day roadmap to ace DSA with daily questions.",
      buttonLabel: "Boom",
      color: "blue",
      fileUrl: _75, 
      
    },
    {
      title: "Complete DSA Sheet",
      description: "A comprehensive sheet covering all important DSA topics.",
      buttonLabel: "Boom",
      color: "green",
      fileUrl: DSA, 

    },
    {
      title: "DSA Roadmap",
      description: "Step-by-step guidance to understand and master DSA.",
      buttonLabel: "Boom",
      color: "purple",
      fileUrl: DSA_, 

    },
  ];

  const bottomCardsData = [
    {
      title: "Design and Analysis of Algorithms",
      options: ["Handwritten Notes", "Practice Questions", "Explore Course"],
      color: "red",
      fileUrl: DSA, 

    },
    {
      title: "Operating System",
      options: ["Handwritten Notes", "Practice Questions", "Explore Course"],
      color: "",
      fileUrl: SOFT, 

    },
    {
      title: "Computer Networks",
      options: ["Handwritten Notes", "Practice Questions", "Explore Course"],
      color: "",
      fileUrl: CN, 

    },
    {
      title: "Database Management Systems",
      options: ["Handwritten Notes", "Practice Questions", "Explore Course"],
      color: "",
      fileUrl: DBMS, 

    },
  ];

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white shadow-sm px-6 py-4 mb-8 w-[screen] mx-auto rounded">
        <div className="text-2xl font-bold text-blue-600">Code Combat</div>
        {user ? (
          <div className="flex items-center justify-center gap-2 cursor-pointer"
          onClick={handleProfile}
          >
          <button
            className="flex items-center justify-center border-2 border-blue-500 text-blue-500 p-2 rounded-full h-10 w-10 hover:bg-blue-500 hover:text-white"
          >
            <FaUser className="text-3xl font-bold" />
          </button>
          <p className=" text-blue-700 font-semibold">{user.username}</p>

          </div>
        ) : (
          <button
            className="border border-violet-500 text-violet-500 px-4 py-2 rounded hover:bg-violet-500 hover:text-white"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        )}
      </nav>

      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Welcome to DSA & CS Learning Hub
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Explore curated content to master Data Structures, Algorithms, and Core CS subjects.
        </p>
      </header>

      {/* Top Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {topCardsData.map((card, index) => (
          <HomeTopCard
            key={index}
            title={card.title}
            description={card.description}
            buttonLabel={card.buttonLabel}
            color={card.color}
            fileUrl={card.fileUrl}
          />
        ))}
      </section>

      {/* Bottom Cards Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Core CS Subjects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {bottomCardsData.map((card, index) => (
            <HomeBottomCard
              key={index}
              title={card.title}
              options={card.options}
              color={card.color}
              fileUrl={card.fileUrl}

            />
          ))}
        </div>
      </section>
      <HelpPopup/>
    </div>
  );
};

export default HomePage;
