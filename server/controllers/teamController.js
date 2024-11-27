// const Team = require('../models/Team');
// const Contest = require('../models/Contest');
// const { v4: uuidv4 } = require('uuid');  // Use UUID for generating unique team keys

// // Create a new team
// exports.createTeam = async (req, res) => {
//   const { contestId } = req.params;
//   const { teamName, teamSize } = req.body;

//   try {
//     // Find contest by ID
//     const contest = await Contest.findById(contestId);
//     if (!contest) {
//       return res.status(404).json({ message: 'Contest not found' });
//     }

//     // Generate a unique team key for the new team
//     const teamKey = uuidv4();

//     // Create a new team
//     const newTeam = new Team({
//       teamName,
//       teamSize,
//       contestId,
//       teamKey,
//     });

//     // Save the team to the database
//     await newTeam.save();
    
//     res.status(201).json({
//       message: 'Team created successfully',
//       teamKey,
//       members: newTeam.members,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // Join an existing team
// exports.joinTeam = async (req, res) => {
//   const { contestId } = req.params;
//   const { teamKey } = req.body;

//   try {
//     // Find the team by teamKey and contestId
//     const team = await Team.findOne({ teamKey, contestId });
//     if (!team) {
//       return res.status(404).json({ message: 'Team not found' });
//     }

//     // Add the user to the team (assuming user is authenticated)
//     team.members.push({ name: req.user.name, userId: req.user._id });
//     await team.save();
    
//     res.status(200).json({ success: true, team });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // Get all teams for a specific contest
// exports.getTeamsByContest = async (req, res) => {
//   const { contestId } = req.params;

//   try {
//     const teams = await Team.find({ contestId }).populate('members', 'name email'); // Populate member details if needed
//     res.status(200).json({ teams });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching teams', error: error.message });
//   }
// };

// // Get a single team by ID
// exports.getTeamById = async (req, res) => {
//   const { teamId } = req.params;

//   try {
//     const team = await Team.findById(teamId).populate('members', 'name email'); // Populate member details
//     if (!team) {
//       return res.status(404).json({ message: 'Team not found' });
//     }
//     res.status(200).json(team);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching team details', error: error.message });
//   }
// };

// // Get all members of a specific team by teamKey
// exports.getTeamMembers = async (req, res) => {
//   const { contestId, teamKey } = req.params;

//   try {
//     // Find the team by contestId and teamKey
//     const team = await Team.findOne({ contestId, teamKey }).populate('members', 'name email');
//     if (!team) {
//       return res.status(404).json({ message: 'Team not found' });
//     }

//     res.status(200).json(team.members); // Return the list of team members
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // Update team score (e.g., after a round of competition)
// exports.updateTeamScore = async (req, res) => {
//   const { teamId } = req.params;
//   const { scoreIncrement } = req.body;

//   try {
//     const team = await Team.findById(teamId);

//     if (!team) {
//       return res.status(404).json({ message: 'Team not found' });
//     }

//     // Increment the team's score
//     team.score += scoreIncrement;
//     await team.save();

//     res.status(200).json({ message: 'Score updated successfully', team });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error updating team score', error: error.message });
//   }
// };
const Team = require('../models/Team'); // Import the Team model
const Contest = require('../models/Contest'); // Import the Contest model

// Create a new team for a contest
exports.createTeam = async (req, res) => {
  const { contestId } = req.params;  // Get contestId from URL params
  const { teamName, teamSize } = req.body;   // Get team name and size from request body
  console.log(req.body);
  
  try {
    // Ensure that the contest exists
    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }

    // Create a new team
    const newTeam = new Team({
      teamName,
      teamSize,
      contestId,
      members: [], // You can initially leave the members empty or add the first member if necessary
    });

    // Save the team to the database
    await newTeam.save();

    // Add the new team to the contest (optional, depending on your contest model)
    contest.teams.push(newTeam._id); // Assuming `teams` is an array in the Contest model
    await contest.save();

    // Respond with the newly created team
    res.status(201).json(newTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating team' });
  }
};

// Fetch all teams for a specific contest
exports.getTeamsByContest = async (req, res) => {
  const { contestId } = req.params;

  try {
    // Find the contest by ID and populate the teams associated with the contest
    const contest = await Contest.findById(contestId).populate('teams'); // Populate teams field if it's referenced in the Contest model
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }

    // Return the list of teams
    res.status(200).json(contest.teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ message: 'Error fetching teams' });
  }
};

// Fetch a single team by its ID
exports.getTeamById = async (req, res) => {
  const { teamId } = req.params;

  try {
    // Find the team by its ID
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Return the team details
    res.status(200).json(team);
  } catch (error) {
    console.error('Error fetching team details:', error);
    res.status(500).json({ message: 'Error fetching team details' });
  }
};

// Update a team's score (e.g., after a contest round)
exports.updateTeamScore = async (req, res) => {
  const { teamId } = req.params;
  const { score } = req.body;
  console.log(score)
  try {
    // Assume you have a Team model with a `score` field
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    team.score = score; // Update the score
    await team.save();

    return res.status(200).json({ message: "Team score updated successfully", score: team.score });
  } catch (error) {
    console.error('Error updating team score:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.joinTeam = async (req, res) => {
  const { contestId, teamId } = req.params;
  const { userId } = req.body;

  try {
    // Find the team in the given contest
    const team = await Team.findOne({ _id: teamId, contestId });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if the team is full
    if (team.members.length >= team.teamSize) {
      return res.status(400).json({ message: 'Team is already full' });
    }

    // Check if the user is already in the team
    if (team.members.includes(userId)) {
      return res.status(400).json({ message: 'User is already a member of the team' });
    }

    // Add the user to the team's members array
    team.members.push(userId);
    await team.save();

    // Populate members to return detailed user information if needed
    const populatedTeam = await team.populate('members');

    res.status(200).json({
      message: 'User joined the team successfully',
      team: populatedTeam,
    });
  } catch (error) {
    console.error('Error joining team:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

