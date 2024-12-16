import React, { useEffect, useState } from "react";
import Ellipse from "../../assets/Ellipse 20@1x.png";
import RectangleTop from "../../assets/Rectangle 3@1x.png";
import RectangleBottom from "../../assets/Rectangle 1@3x.png";
import ProfileCard from "./ProfileCard";
import Leaderboard from "./Leaderboard/Leaderboard";
import StatusGraph from "./StatusGraph";
import { Link } from "react-router-dom";
import axios from "axios";
import {useUser} from '../../Contexts/UserContext'
const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [userId,setUserId]=useState('')
  const { user } = useUser(); 
  useEffect(() => {
    console.log(user)
  setUserId(user.userId)

  },[])
  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updates = { github:githubUrl, linkedin:linkedinUrl };

    try {
      console.log(updates);
      
      await axios.put(`http://localhost:5000/user/update/${userId}`, updates); // Replace with your backend endpoint
      alert("Links updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating links:", error);
      alert("Failed to update links. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <div className="z-10 absolute left-24 top-[12%]">
        <ProfileCard />
      </div>
      <div className="z-10 absolute top-[50%] left-[25%]">
        <StatusGraph />
      </div>
      <div className="mask relative z-1 w-screen h-screen overflow-hidden">
        <img
          src={Ellipse}
          alt="left-ecllipse"
          className="absolute bottom-0 -right-1/4 w-[1228px] h-[1122px]"
        />
        <img
          src={RectangleTop}
          alt="top-rectangle"
          className="absolute -top-[72%] -left-1/4 w-[1000px] h-[900px]"
        />
        <img
          src={RectangleBottom}
          alt="bottom-rectangle"
          className="absolute -bottom-[90%] -left-1/4 w-[1228px] h-[1122px]"
        />
      </div>
      <div
        className="mt-5 absolute top-0 right-10 flex items-center justify-center bg-indigo-700 h-10 w-20 text-white rounded-lg cursor-pointer"
        onClick={handleEdit}
      >
        Edit
      </div>
      <div className="absolute right-20 top-[15%] z-30">
        <Leaderboard />
      </div>
      <div className="mt-10 absolute bottom-[20%] right-40">
        <Link
          to={`/battle/`}
          className="inline-block px-14 py-6 text-white cursor-pointer bg-violet-600 rounded-full shadow-lg hover:bg-violet-700 focus:outline-none transition-colors duration-300"
        >
          Move to Battle Ground
        </Link>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-55 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Update Links</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">GitHub URL</label>
                <input
                  type="url"
                  className="w-full p-2 border rounded"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  className="w-full p-2 border rounded"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 px-4 py-2 bg-gray-300 rounded"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-700 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
