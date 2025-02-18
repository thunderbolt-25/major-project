// src/components/Attendance.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Attendance.css'; // Import the CSS file

const Attendance = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch attendance records from the backend API
        axios.get('http://localhost:3001/attendance')
            .then(response => {
                setAttendanceRecords(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching attendance records');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="attendance-container">
            <h1 className="attendance-title">Attendance Records</h1>
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Attendance ID</th>
                        <th>Student ID</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceRecords.map(record => (
                        <tr key={record.attendance_id} className="attendance-row">
                            <td>{record.attendance_id}</td>
                            <td>{record.student_id}</td>
                            <td>{new Date(record.date).toLocaleDateString()}</td>
                            <td>
                                <span className={`status ${record.status.toLowerCase()}`}>
                                    {record.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Attendance;