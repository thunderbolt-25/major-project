// src/components/Placements.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Placements = () => {
    const [placements, setPlacements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch placements from the backend API
        axios.get('http://localhost:3001/placements')
            .then(response => {
                setPlacements(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching placements');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Placements</h1>
            <table>
                <thead>
                    <tr>
                        <th>Placement ID</th>
                        <th>Student ID</th>
                        <th>Company ID</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {placements.map(placement => (
                        <tr key={placement.placement_id}>
                            <td>{placement.placement_id}</td>
                            <td>{placement.student_id}</td>
                            <td>{placement.company_id}</td>
                            <td>{placement.position}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Placements;