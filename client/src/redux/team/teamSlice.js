// redux/slices/teamSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teams: [], // Store teams in an array
};

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    // Action to add a new team
    addTeam: (state, action) => {
      const { teamName, teamSize, creator } = action.payload;
      state.teams.push({
        teamName,
        teamSize,
        creator,
        members: [creator], // Initially, the creator is the first member
      });
    },
    // Action to join an existing team
    joinTeam: (state, action) => {
      const { joinCode, joiner } = action.payload;
      const team = state.teams.find((team) => team.teamName === joinCode);
      if (team && team.members.length < team.teamSize) {
        team.members.push(joiner);
      }
    },
  },
});

export const { addTeam, joinTeam } = teamSlice.actions;
export default teamSlice.reducer;
