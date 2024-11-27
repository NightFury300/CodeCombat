import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2"; // Doughnut chart from Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useParams, Link } from "react-router-dom"; // Added Link for navigation

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultPage = () => {
  const [teamScore, setTeamScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [teamName, setTeamName] = useState('');
  const totalScore = 150; // Total possible score
  const { contestId, teamId } = useParams(); // Extract the contestId and teamId from the URL

  useEffect(() => {
    // Fetch the team score from API
    const fetchTeamScore = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/contest/team/${teamId}`);
        setTeamScore(response.data.score); // Assuming the response contains the team score
        setTeamName(response.data.teamName); // Assuming the response contains the team name
      } catch (error) {
        console.error("Error fetching team score:", error);
      }
    };

    // Fetch the leaderboard from API
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/contest/${contestId}/teams`);
        setLeaderboard(response.data); // Assuming the response contains the leaderboard data (team names and scores)
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchTeamScore();
    fetchLeaderboard();
  }, [contestId, teamId]);

  // Sort leaderboard based on scores (descending order)
  const sortedLeaderboard = leaderboard
    .sort((a, b) => b.score - a.score)
    .map((team, index) => ({
      ...team,
      rank: index + 1, // Add rank to each team
    }));

  const chartData = {
    labels: ["Your Score", "You can Score"],
    datasets: [
      {
        data: [teamScore, totalScore - teamScore],
        backgroundColor: ["#4caf50", "#e0e0e0"], // Green for the score, gray for the remaining score
        borderWidth: 0, // Removes the border around each segment
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
        display: false, // Hides the legend
      },
    },
  };

  return (
    <div className="flex flex-col gap-20 items-center p-10">
        <p className="font-bold text-4xl">Detailed Result </p>
        <div className="p-16 flex gap-12 w-full">
            {/* Left side - Donut Chart */}
            <div className="flex flex-col items-center justify-center lg:w-1/2">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Team: {teamName} - Result</h1>
          <p className="text-lg mt-2">Total Score: {teamScore} / {totalScore}</p>
        </div>
        <div className="w-64 h-64 mt-8">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
            </div>

              {/* Right side - Leaderboard */}
            <div className="lg:w-1/2 flex flex-col gap-10 items-center ">
        <h2 className="text-2xl font-semibold text-center">Leaderboard</h2>
        <div className="">
          {sortedLeaderboard.map((team, index) => (
            <div
              key={team.id}
              className={`p-6 rounded-lg w-[450px] shadow-lg flex items-center justify-between 
                ${index === 0 ? 'bg-orange-100' : `bg-gray-${100 + index * 50}`} 
                transition-all duration-300 ease-in-out`}
            >
              <div
                className={`text-3xl font-bold ${index === 0 ? 'text-orange-600' : 'text-gray-700'}`}
              >
                {team.rank}
              </div>
              <div className="text-xl font-semibold px-4">{team.teamName}</div>
              <div className="text-xl font-semibold px-4">{team.score}</div>
            </div>
          ))}
        </div>
            </div>
      </div>

      {/* Move to Battle Ground Button */}
      <div className="mt-10">
        <Link to={`/battle/`} className="inline-block px-8 py-3 text-white bg-violet-600 rounded-full shadow-lg hover:bg-violet-700 focus:outline-none transition-colors duration-300">
          Move to Battle Ground
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;
