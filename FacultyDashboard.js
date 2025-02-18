// src/pages/FacultyDashboard.js
import React, { useState } from 'react';
import './FacultyDashboard.css'; // Import CSS for styling

const FacultyDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="dashboard">
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="profile">
                    <img src="/images/profile.jpg" alt="Profile" className="profile-img" />
                    <p>Welcome, Admin</p>
                </div>
                <ul className="menu">
                    <li>Configuration</li>
                    <li>Dashboard</li>
                    <li>Course Management</li>
                    <li>Student</li>
                    <li>Employee</li>
                    <li>Fees</li>
                    <li>Reports Center</li>
                    <li>User Rights</li>
                </ul>
            </aside>
            <main className="main-content">
                <button className="toggle-button" onClick={toggleSidebar}>
                    {isSidebarOpen ? '←' : '→'}
                </button>
                <header className="header">
                    <h1>Admin Dashboard</h1>
                </header>
                <section className="info-cards">
                    <div className="card">16 Students</div>
                    <div className="card">15 Employees</div>
                    <div className="card">6 Active Courses</div>
                    <div className="card">6 Active Batches</div>
                </section>
                <section className="notice-board">
                    <h2>Notice Board</h2>
                    <div className="notice">Summer Vacation starts from June to July 2nd week.</div>
                    <div className="notice">Annual Function: All students & Employees are invited.</div>
                    <div className="notice">Group Discussion: Join us for GD.</div>
                    <div className="notice">Annual Techno Fest organized on July Month.</div>
                </section>
                <section className="calendar">
                    <h2>Calendar</h2>
                    <p>Calendar component goes here</p>
                </section>
            </main>
        </div>
    );
};

export default FacultyDashboard;