// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import CSS for styling

const HomePage = () => {
    return (
        <div>
            <header className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to College ERP</h1>
                    <p>Streamline your college management with our comprehensive ERP solution.</p>
                    <Link to="#get-started" className="cta-button">Get Started</Link>
                </div>
            </header>

            <section id="about" className="about-section">
                <div className="content-wrapper">
                    <div className="text-content">
                        <h2>About Our System</h2>
                        <p>Our ERP system is designed to manage student data, placements, and attendance efficiently.</p>
                    </div>
                    <img src="/images/about.jpg" alt="About" className="about-image" />
                </div>
            </section>

            <section id="features" className="features-section">
                <div className="content-wrapper">
                    <div className="text-content">
                        <h2>Features</h2>
                        <div className="feature-list">
                            <div className="feature-item">
                                <h3>Student Management</h3>
                                <p>Manage student records with ease.</p>
                            </div>
                            <div className="feature-item">
                                <h3>Placement Tracking</h3>
                                <p>Track student placements effectively.</p>
                            </div>
                            <div className="feature-item">
                                <h3>Attendance Records</h3>
                                <p>Maintain accurate attendance records.</p>
                            </div>
                        </div>
                    </div>
                    <img src="/images/features.jpg" alt="Features" className="features-image" />
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2025 College ERP. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;