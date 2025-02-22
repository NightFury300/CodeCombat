import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../Contexts/UserContext";
import Stats from "./Stats";
import profilePic from "../../assets/profile.png";

const ProfileCard = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState({
    contestsParticipated: 0,
    problemsSolved: 0,
    rank: 0,
  });
  const [profile, setProfile] = useState("");
  const [error, setError] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [editGithub, setEditGithub] = useState(false);
  const [editLinkedin, setEditLinkedin] = useState(false);
  const [newGithub, setNewGithub] = useState("");
  const [newLinkedin, setNewLinkedin] = useState("");

  useEffect(() => {
    if (user) {
      const userId = user.userId;

      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}`);
          setUserData(response.data.user.statistics);
          setProfile(response.data.user.googleId);
          setGithub(response.data.user.github);
          setLinkedin(response.data.user.linkedin);
        } catch (err) {
          setError("Failed to fetch user data");
        }
      };

      fetchUserProfile();
    }
  }, [user]);

  const saveGithub = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/update/${user.userId}`, { github: newGithub });
      setGithub(newGithub);
      setEditGithub(false);
    } catch (error) {
      console.error("Error updating GitHub:", error);
      alert("Failed to update GitHub. Please try again.");
    }
  };

  const saveLinkedin = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/update/${user.userId}`, { linkedin: newLinkedin });
      setLinkedin(newLinkedin);
      setEditLinkedin(false);
    } catch (error) {
      console.error("Error updating LinkedIn:", error);
      alert("Failed to update LinkedIn. Please try again.");
    }
  };

  if (!user) {
    return <p className="text-white text-center mt-5">Please log in to view your profile.</p>;
  }

  return (
    <div className="bg-gray-800 shadow-lg h-[420px] w-[1156px] rounded-2xl relative p-6 flex flex-col items-center">
      {/* Profile Image */}
      <div className="bg-gray-700 h-[140px] w-[140px] rounded-full absolute -top-16 flex items-center justify-center overflow-hidden shadow-md border-4 border-gray-600">
        <img src={profilePic} alt="Profile" className="h-full w-full object-cover" />
      </div>

      {/* User Name */}
      <div className="mt-20">
        <p className="text-white font-semibold text-2xl">{user.username}</p>
      </div>

      {/* Social Links */}
      <div className="flex mt-4 space-x-6">
        {/* GitHub */}
        <div className="flex flex-col items-center">
          <a href={github} target="_blank" rel="noopener noreferrer" className="w-full">
            <div className="bg-gray-900 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 
                            hover:bg-gray-700 hover:scale-105 active:scale-95 shadow-md cursor-pointer">
              GitHub
            </div>
          </a>
          {editGithub ? (
            <div className="mt-2 flex flex-col items-center">
              <input
                type="text"
                value={newGithub}
                onChange={(e) => setNewGithub(e.target.value)}
                className="p-2 text-black rounded-lg w-64 outline-none border-2 border-gray-500"
                placeholder="Enter new GitHub URL"
              />
              <button onClick={saveGithub} className="mt-1 px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">
                Save
              </button>
            </div>
          ) : (
            <button onClick={() => { setEditGithub(true); setNewGithub(github); }} 
                    className="text-sm text-gray-400 hover:text-white mt-1 transition-all">
              Edit
            </button>
          )}
        </div>

        {/* LinkedIn */}
        <div className="flex flex-col items-center">
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-full">
            <div className="bg-gray-900 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 
                            hover:bg-gray-700 hover:scale-105 active:scale-95 shadow-md cursor-pointer">
              LinkedIn
            </div>
          </a>
          {editLinkedin ? (
            <div className="mt-2 flex flex-col items-center">
              <input
                type="text"
                value={newLinkedin}
                onChange={(e) => setNewLinkedin(e.target.value)}
                className="p-2 text-black rounded-lg w-64 outline-none border-2 border-gray-500"
                placeholder="Enter new LinkedIn URL"
              />
              <button onClick={saveLinkedin} className="mt-1 px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">
                Save
              </button>
            </div>
          ) : (
            <button onClick={() => { setEditLinkedin(true); setNewLinkedin(linkedin); }} 
                    className="text-sm text-gray-400 hover:text-white mt-1 transition-all">
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Stats Component */}
      <Stats />
    </div>
  );
};

export default ProfileCard;
