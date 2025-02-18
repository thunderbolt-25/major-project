// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import CSS for styling

const Navbar = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');
    const isAuthenticated = !!userRole;

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">College Management System</Link>
            </div>
            <ul className="navbar-links">
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        {userRole === 'faculty' && (
                            <>
                                <li>
                                    <Link to="/students">Manage Students</Link>
                                </li>
                                <li>
                                    <Link to="/placements">Manage Placements</Link>
                                </li>
                                <li>
                                    <Link to="/attendance">Manage Attendance</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;