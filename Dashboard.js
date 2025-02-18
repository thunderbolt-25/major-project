// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Import CSS for styling

const Dashboard = () => {
    const userRole = localStorage.getItem('userRole');

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            {userRole === 'faculty' ? (
                <div className="dashboard-content">
                    <p>Welcome, Faculty! You can view and edit data.</p>
                    <Link to="/students" className="dashboard-link">Manage Students</Link>
                    <Link to="/placements" className="dashboard-link">Manage Placements</Link>
                    <Link to="/attendance" className="dashboard-link">Manage Attendance</Link>
                    <Link to="/facultydash" className="dashboard-link">Faculty Dashboard</Link>
                </div>
            ) : (
                <div className="dashboard-content">
                    <p>Welcome, Student! You can view data.</p>
                    <Link to="/studentonly" className="dashboard-link">View Students</Link>
                    <Link to="/placementonly" className="dashboard-link">View Placements</Link>
                    <Link to="/attendanceonly" className="dashboard-link">View Attendance</Link>
                    <Link to="/studentdash" className="dashboard-link">Student Dashboard</Link>
                </div>
            )}
        </div>
    );
};

export default Dashboard;