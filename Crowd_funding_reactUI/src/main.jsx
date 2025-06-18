import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Register from "./Components/reg.jsx";
import Login from "./Components/login.jsx";
import Home from "./Pages/Home.jsx";
import Profile from "./Pages/Profile.jsx";
import CreateProject from "./Pages/CreateProject.jsx";
import { AuthProvider } from './context/context.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Verfiy from "./Components/verfiy.jsx";
import DonationPage from "./Pages/Donation.jsx";
import ProjectDetailPage from "./Pages/Project.jsx";
import AllProjects from "./Pages/AllProjects.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify" element={<Verfiy />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/donate" element={<DonationPage />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
            <Route path="/projects/all" element={<AllProjects />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);