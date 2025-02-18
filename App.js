// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import StudentPage from './pages/StudentPage';
import PlacementPage from './pages/PlacementPage';
import AttendancePage from './pages/AttendancePage';
import Students from './components/Students';
import Placements from './components/Placements';
import Attendance from './components/Attendance';
import FacultyDashboard from './pages/FacultyDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CalendarComp from './pages/CalendarComponent';


function App() {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
                    <Route path="/students" element={<ProtectedRoute element={StudentPage} />} />
                    <Route path="/placements" element={<ProtectedRoute element={PlacementPage} />} />
                    <Route path="/attendance" element={<ProtectedRoute element={AttendancePage} />} />
                    <Route path="/studentonly" element={<ProtectedRoute element={Students} />} />
                    <Route path="/placementonly" element={<ProtectedRoute element={Placements} />} />
                    <Route path="/attendanceonly" element={<ProtectedRoute element={Attendance} />} />
                    <Route path="/facultydash" element={<ProtectedRoute element={FacultyDashboard} />} />
                    <Route path="/studentdash" element={<ProtectedRoute element={StudentDashboard} />} />
                    <Route path="/CalendarComp" element={<ProtectedRoute element={CalendarComp} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;