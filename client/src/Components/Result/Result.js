import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2"; // Doughnut chart from Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useParams, Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component"; // Import the star rating component

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultPage = () => {
  const [teamScore, setTeamScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [teammates, setTeammates] = useState([]); // To store teammates
  const [ratings, setRatings] = useState({}); // To store ratings for each teammate
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal open state
  const totalScore = 150; // Total possible score
  const [userId,setUserId] = useState("")
  const { contestId, teamId } = useParams();

   // Replace with actual logic to get the logged-in user's ID

  useEffect(() => {
    const fetchTeamScore = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/contest/team/${teamId}`
        );

        console.log(response.data.score)
        setTeamScore(response.data.score);
        
        setTeamName(response.data.teamName);
      } catch (error) {
        console.error("Error fetching team score:", error);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/contest/${contestId}/teams`
        );
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    const fetchTeammates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/contest/${teamId}/members`
        );
        const allMembers = response.data.members;

        setUserId(allMembers[0]._id)
        // Separate logged-in user and teammates
        const filteredTeammates = allMembers.filter((member) => member.id !== userId);
        const currentUser = allMembers.find((member) => member.id === userId);
    
        setTeammates(filteredTeammates);
        setRatings(
          filteredTeammates.reduce(
            (acc, teammate) => ({ ...acc, [teammate._id]: 0 }), // Initialize ratings only for teammates
            {}
          )
        );
    
        if (currentUser) {
          setTeamName(currentUser.username); // Set the team name if it's related to the user
        }
      } catch (error) {
        console.error("Error fetching teammates:", error);
      }
    };
    fetchTeamScore();
    fetchLeaderboard();
    fetchTeammates();
  }, [contestId, teamId, userId,teamScore]);

 
  const handleRatingChange = (teammateId, value) => {
   
    setRatings((prevRatings) => ({
      ...prevRatings,
      [teammateId]: value, // Ensure teammateId matches the rating state
    }));
  };
  
  const handleSubmitRatings = async () => {
    try {
      console.log(ratings)
      // Iterate over the teammates array and make a PATCH request for each user
      for (const teammate of teammates) {
        const userId = teammate._id; // Extract the user ID
        const userRating = ratings[userId]; // Get the rating for this user
        if (userRating !== undefined) { // Ensure a rating exists for this user
          await axios.put(`http://localhost:5000/user/${userId}`, {
            rating: userRating, // Include the rating in the request body
          });
        }
      }
  
      // Close the modal and optionally show a success message
      setIsModalOpen(false);
      console.log("Ratings submitted successfully.");
    } catch (error) {
      console.error("Error submitting ratings:", error);
    }
  };
  

  const chartData = {
    labels: ["Your Score", "You can Score"],
    datasets: [
      {
        data: [teamScore, totalScore - teamScore],
        backgroundColor: ["#4caf50", "#e0e0e0"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            const value = context.raw || 0;
            if (label) {
              label += ": ";
            }
            return label + value;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="flex flex-col gap-20 items-center p-10">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-center">Rate Your Teammates</h2>
            <div className="flex flex-col gap-4">
            {teammates.map((teammate) => (
               <div key={teammate._id} className="flex items-center justify-between gap-4">
    <span className="text-lg">{teammate.username}</span>
    <ReactStars
      count={5}
      size={24}
      value={ratings[teammate._id]} // Ensure correct ID is passed here
      onChange={(value) => handleRatingChange(teammate._id, value)} // Correct ID here as well
      activeColor="#ffd700"
    />
               </div>
            ))}

            </div>
            <button
              onClick={handleSubmitRatings}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg w-full"
            >
              Submit Ratings
            </button>
          </div>
        </div>
      )}

      <p className="font-bold text-4xl">Detailed Result</p>
      <div className="p-16 flex gap-12 w-full">
        {/* Left side - Donut Chart */}
        <div className="flex flex-col items-center justify-center lg:w-1/2">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Team: {teamName} - Result</h1>
            <p className="text-lg mt-2">
              Total Score: {Math.floor(teamScore)} / {totalScore}
            </p>
          </div>
          <div className="w-64 h-64 mt-8">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Right side - Leaderboard */}
        <div className="lg:w-1/2 flex flex-col gap-10 items-center ">
          <h2 className="text-2xl font-semibold text-center">Leaderboard</h2>
          <div className="">
            {leaderboard.map((team, index) => (
              <div
                key={team._id}
                className={`p-6 rounded-lg w-[450px] shadow-lg flex items-center justify-between 
                  ${index === 0 ? "bg-violet-200" : `bg-gray-${100 + index * 50}`} 
                  transition-all duration-300 ease-in-out`}
              >
                <div
                  className={`text-3xl font-bold ${
                    index === 0 ? "text-violet-600" : "text-gray-700"
                  }`}
                >
                  {index+1}
                </div>
                <div className="text-violet-900 text-xl font-semibold px-4">{team.teamName}</div>
                <div className="text-violet-400 text-xl font-semibold px-4">{Math.floor(team.score)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Move to Battle Ground Button */}
      <div className="mt-10">
        <Link
          to={`/battle/`}
          className="inline-block px-8 py-3 text-white bg-violet-600 rounded-full shadow-lg hover:bg-violet-700 focus:outline-none transition-colors duration-300"
        >
          Move to Battle Ground
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;
