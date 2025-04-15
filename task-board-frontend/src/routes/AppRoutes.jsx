// src/routes/AppRoutes.jsx
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import LandingPage from "../pages/LandingPage";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/SignUp";
import CreateTask from "../components/Tasks/CreateTask";
import Board from "../components/Board/Board";
import UploadTask from "../pages/UploadTask";
// import BoardPage from "../components/Board/BoardPage";

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/board" element={<Board />} />
        {/* <Route path="/board" element={<BoardPage />} /> */}
        <Route path="/upload/:taskId" element={<UploadTask />} />
      </Routes>
  );
}
