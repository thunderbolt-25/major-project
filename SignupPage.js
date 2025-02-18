// src/pages/SignupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PasswordChecklist from 'react-password-checklist';
import './SignupPage.css'; // Import CSS for styling

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [studentId, setStudentId] = useState(''); // New state for Student ID
    const [role, setRole] = useState('student');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        if (!isPasswordValid) {
            alert('Please ensure your password meets all the criteria.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/api/signup', {
                email,
                password,
                studentId, // Include student ID in the request
                role
            });
            if (response.data.success) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userRole', role);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2>Signup</h2>
                <form onSubmit={handleSignup}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <PasswordChecklist
                        rules={["minLength", "specialChar", "number", "capital"]}
                        minLength={8}
                        value={password}
                        onChange={(isValid) => setIsPasswordValid(isValid)}
                    />
                    <input
                        type="text"
                        placeholder="Student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                    />
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                    </select>
                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;