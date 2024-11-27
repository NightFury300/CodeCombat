import React from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import './App.css';
// import { ContestProvider } from "./Components/Battle/ContestContext";  // Import ContestProvider

import Login from "./Components/Auth/Login";
import Signup from './Components/Auth/Signup';
import ProfilePage from './Pages/ProfilePage';
import HomePage from "./Pages/HomePage";
import BattlePage from "./Pages/BattlePage";
import JoinTeamPage from "./Pages/JoinTeamPage";
import ErrorPage from "./Pages/ErrorPage";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './Contexts/AuthContext';
import  Editor from './Components/Editor/CodeEditor';
import { UserProvider } from './Contexts/UserContext';
import ResultPage from './Components/Result/Result';
function App() {
  return (
    <div className="App"> 
     <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<GoogleOAuthProvider clientId={`47807524301-97t2ovb411oua4s6crhbbkotoiu5127r.apps.googleusercontent.com`}><Login /></GoogleOAuthProvider>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="/contest/:contestId" element={<UserProvider><JoinTeamPage /></ UserProvider>} />     
          <Route path="/signup" element={<GoogleOAuthProvider clientId={`47807524301-97t2ovb411oua4s6crhbbkotoiu5127r.apps.googleusercontent.com`}><Signup /></GoogleOAuthProvider>} />
          <Route path='/contest/:contestId/team/:teamId/code-editor' element={< UserProvider><Editor /></ UserProvider>}/>
          <Route path='contest/:contestId/result/:teamId' element={<ResultPage/>} />
          <Route path="*" element={<ErrorPage />} /> {/* Catch-all route for 404 */}
        </Routes>
      </Router>         
    </UserProvider>

    </div>
  );
}

export default App;
