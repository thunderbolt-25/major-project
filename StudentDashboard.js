// src/pages/StudentDashboard.js
import React, { useState } from 'react';
import './StudentDashboard.css'; // Import CSS for styling
import SemiDonutChart from "./SemiDonutChart";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { type: 'bot', text: '👋 Hi! How can I help you with BTech placements?' }
    ]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleChat = () => {
        setChatOpen(!chatOpen);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        setChatMessages([...chatMessages, { type: 'user', text: `🧑‍💻 ${userInput}` }]);
        setUserInput('');

        setChatMessages((prevMessages) => [
            ...prevMessages,
            { type: 'bot', text: '🤖 Typing...', typing: true }
        ]);

        try {
            const response = await fetch("http://localhost:3000/studentdash", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: userInput })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setChatMessages((prevMessages) =>
                prevMessages.filter((msg) => !msg.typing).concat({ type: 'bot', text: `🤖 ${data.response}` })
            );
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            setChatMessages((prevMessages) =>
                prevMessages.filter((msg) => !msg.typing).concat({ type: 'bot', text: '⚠️ Unable to fetch response. Try again later.' })
            );
        }
    };

    return (
        <>
            <div className="chat-icon" onClick={toggleChat}>💬</div>
            {chatOpen && (
                <div className="chat-container">
                    <div className="chat-header">
                        <span>Chatbot - Ask Me Anything</span>
                        <button className="close-btn" onClick={toggleChat}>✖</button>
                    </div>
                    <div className="chat-body">
                        {chatMessages.map((msg, index) => (
                            <p key={index} className={msg.type === 'bot' ? 'bot-message' : 'user-message'}>
                                {msg.text}
                            </p>
                        ))}
                    </div>
                    <div className="chat-footer">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Type your message..."
                            onKeyPress={handleKeyPress}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}

            <div className="dashboard">
                <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <div className="logo">CPMS</div>
                    <ul className="menu">
                        <li>Dashboard</li>
                        <li><Link to="/CalendarComp">Schedules</Link></li>
                        <li>Courses</li>
                        <li>Message</li>
                        <li>Settings</li>
                    </ul>
                    <div className="upgrade">
                        <button className="upgrade-button">Upgrade Now</button>
                    </div>
                </aside>
                <main className="main-content">
                    <button className="toggle-button" onClick={toggleSidebar}>
                        {isSidebarOpen ? '←' : '→'}
                    </button>
                    <header className="header">
                        <h1>Hello Ankit</h1>
                        <p>Keep up your amazing progress!</p>
                        <div className="profile">
                            <img src="/images/profile.jpg" alt="Profile" className="profile-img" />
                            <span>Ankit Singh</span>
                        </div>
                    </header>
                    <section className="overview">
                        <h2>Overview</h2>
                        <div className="chart">
                            <SemiDonutChart />
                        </div>
                    </section>
                    <section className="courses">
                        <h2>My Courses</h2>
                        <div className="course">
                            <h3>Typography</h3>
                            <p>4 Classes left</p>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '75%' }}></div>
                            </div>
                        </div>
                        <div className="course">
                            <h3>Abstract Principle</h3>
                            <p>4 Classes left</p>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '50%' }}></div>
                            </div>
                        </div>
                    </section>
                    <section className="tasks">
                        <h2>Today's Tasks</h2>
                        <div className="task">Basic Principle of Design</div>
                        <div className="task">Tips & Tricks for Interface</div>
                        <div className="task">Learning & Earning</div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default StudentDashboard;