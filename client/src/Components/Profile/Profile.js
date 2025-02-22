import React, { useEffect, useState } from "react";
import Ellipse from "../../assets/Ellipse 20@1x.png";
import RectangleTop from "../../assets/Rectangle 3@1x.png";
import RectangleBottom from "../../assets/Rectangle 1@3x.png";
import ProfileCard from "./ProfileCard";
import Leaderboard from "./Leaderboard/Leaderboard";
import StatusGraph from "./StatusGraph";
import { useUser } from "../../Contexts/UserContext";

const Profile = () => {
  const [userId, setUserId] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setUserId(user.userId);
    }
  }, [user]);

  return (
    <div className="relative w-screen h-screen bg-gray-900 text-white flex justify-center items-center overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={Ellipse}
          alt="Decorative Ellipse"
          className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vh] opacity-20 blur-2xl"
        />
        <img
          src={RectangleTop}
          alt="Decorative Rectangle"
          className="absolute top-[-15%] left-[-5%] w-[40vw] h-[40vh] opacity-10 blur-3xl"
        />
        <img
          src={RectangleBottom}
          alt="Decorative Rectangle"
          className="absolute bottom-[-30%] left-[-10%] w-[50vw] h-[50vh] opacity-10 blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full">
        {/* Profile Card */}
        <div className="absolute left-24 top-[12%]">
          <ProfileCard />
        </div>

        {/* Status Graph */}
        <div className="absolute top-[50%] left-[25%]">
          <StatusGraph />
        </div>

        {/* Leaderboard */}
        <div className="absolute right-20 top-[15%] z-30">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
