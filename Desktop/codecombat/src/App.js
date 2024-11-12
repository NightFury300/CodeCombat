import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "./Components/Auth/Login";
import Signup from './Components/Auth/Signup';
import ProfilePage from './Pages/ProfilePage';
import HomePage from "./Pages/HomePage";
import BattlePage from "./Pages/BattlePage";
import PracticePage from "./Pages/PracticePage";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="*" element={<ErrorPage />} /> {/* Catch-all route for 404 */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
