// // src/pages/PlacementPage.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './PlacementPage.css'; // Import CSS for styling

// const PlacementPage = () => {
//     const [placements, setPlacements] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [newPlacement, setNewPlacement] = useState({
//         student_id: '',
//         company_id: '',
//         position: ''
//     });

//     useEffect(() => {
//         fetchPlacements();
//     }, []);

//     const fetchPlacements = () => {
//         axios.get('http://localhost:3001/placements')
//             .then(response => {
//                 setPlacements(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 setError('Error fetching placements');
//                 setLoading(false);
//             });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewPlacement({ ...newPlacement, [name]: value });
//     };

//     const handleAddPlacement = (e) => {
//         e.preventDefault();
//         if (newPlacement.student_id && newPlacement.company_id && newPlacement.position) {
//             axios.post('http://localhost:3001/placements', newPlacement)
//                 .then(() => {
//                     fetchPlacements();
//                     setNewPlacement({ student_id: '', company_id: '', position: '' });
//                 })
//                 .catch(error => {
//                     setError('Error adding placement');
//                 });
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div className="placement-page">
//             <h1>Placement Management</h1>
//             <form onSubmit={handleAddPlacement} className="placement-form">
//                 <h2>Add New Placement</h2>
//                 <input
//                     type="text"
//                     name="student_id"
//                     placeholder="Student ID"
//                     value={newPlacement.student_id}
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="text"
//                     name="company_id"
//                     placeholder="Company ID"
//                     value={newPlacement.company_id}
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="text"
//                     name="position"
//                     placeholder="Position"
//                     value={newPlacement.position}
//                     onChange={handleInputChange}
//                 />
//                 <button type="submit">Add Placement</button>
//             </form>
//             <h2>Placement List</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Placement ID</th>
//                         <th>Student ID</th>
//                         <th>Company ID</th>
//                         <th>Position</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {placements.map(placement => (
//                         <tr key={placement.placement_id}>
//                             <td>{placement.placement_id}</td>
//                             <td>{placement.student_id}</td>
//                             <td>{placement.company_id}</td>
//                             <td>{placement.position}</td>
//                             <td>
//                                 {/* You can add Edit and Delete functionalities here */}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default PlacementPage;
// src/pages/PlacementPage.js
// src/pages/PlacementPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlacementPage.css';

const PlacementPage = () => {
    const [placements, setPlacements] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPlacement, setNewPlacement] = useState({
        student_id: '',
        company_id: '',
        position: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [placementResponse, companyResponse] = await Promise.all([
                    axios.get('http://localhost:3001/placements'),
                    axios.get('http://localhost:3001/companies')
                ]);
                setPlacements(placementResponse.data);
                setCompanies(companyResponse.data);
            } catch {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPlacement(prev => ({ ...prev, [name]: value }));
    };

    const handleAddPlacement = async (e) => {
        e.preventDefault();
        if (!newPlacement.student_id || !newPlacement.company_id || !newPlacement.position) return;

        try {
            await axios.post('http://localhost:3001/placements', newPlacement);
            const response = await axios.get('http://localhost:3001/placements');
            setPlacements(response.data);
            setNewPlacement({ student_id: '', company_id: '', position: '' });
        } catch {
            setError('Error adding placement');
        }
    };

    const getCompanyName = (companyId) => {
        const company = companies.find(c => c.id === companyId);
        return company ? company.name : 'Unknown';
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="placement-page">
            <h1>Placement Management</h1>
            <form onSubmit={handleAddPlacement} className="placement-form">
                <h2>Add New Placement</h2>
                <input type="text" name="student_id" placeholder="Student ID" value={newPlacement.student_id} onChange={handleInputChange} />
                <input type="text" name="company_id" placeholder="Company ID" value={newPlacement.company_id} onChange={handleInputChange} />
                <input type="text" name="position" placeholder="Position" value={newPlacement.position} onChange={handleInputChange} />
                <button type="submit">Add Placement</button>
            </form>

            <h2>Placement List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Placement ID</th>
                        <th>Student ID</th>
                        <th>Company Name</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {placements.map(placement => (
                        <tr key={placement.id || placement.placement_id}>
                            <td>{placement.id || placement.placement_id}</td>
                            <td>{placement.student_id}</td>
                            <td>{getCompanyName(placement.company_id)}</td>
                            <td>{placement.position}</td>
                            <td>
                                {/* Add Edit/Delete actions here */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlacementPage;
