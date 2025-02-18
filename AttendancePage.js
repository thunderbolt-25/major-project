// src/pages/AttendancePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AttendancePage.css'; // Import CSS for styling

const AttendancePage = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newRecord, setNewRecord] = useState({
        student_id: '',
        date: '',
        status: 'Present'
    });

    useEffect(() => {
        fetchAttendanceRecords();
    }, []);

    const fetchAttendanceRecords = () => {
        axios.get('http://localhost:3001/attendance')
            .then(response => {
                setAttendanceRecords(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching attendance records');
                setLoading(false);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecord({ ...newRecord, [name]: value });
    };

    const handleAddRecord = (e) => {
        e.preventDefault();
        if (newRecord.student_id && newRecord.date) {
            axios.post('http://localhost:3001/attendance', newRecord)
                .then(() => {
                    fetchAttendanceRecords();
                    setNewRecord({ student_id: '', date: '', status: 'Present' });
                })
                .catch(error => {
                    setError('Error adding attendance record');
                });
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="attendance-page">
            <h1 className="page-title">Attendance Management</h1>
            <form onSubmit={handleAddRecord} className="attendance-form">
                <h2>Add New Attendance Record</h2>
                <div className="form-group">
                    <input
                        type="text"
                        name="student_id"
                        placeholder="Student ID"
                        value={newRecord.student_id}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="date"
                        name="date"
                        value={newRecord.date}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <select
                        name="status"
                        value={newRecord.status}
                        onChange={handleInputChange}
                    >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">Add Record</button>
            </form>
            <h2 className="records-title">Attendance Records</h2>
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Attendance ID</th>
                        <th>Student ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceRecords.map(record => (
                        <tr key={record.attendance_id}>
                            <td>{record.attendance_id}</td>
                            <td>{record.student_id}</td>
                            <td>{new Date(record.date).toLocaleDateString()}</td>
                            <td>
                                <span className={`status ${record.status.toLowerCase()}`}>
                                    {record.status}
                                </span>
                            </td>
                            <td>
                                {/* You can add Edit and Delete functionalities here */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendancePage;