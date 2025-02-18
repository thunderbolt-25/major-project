// // src/pages/StudentPage.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './StudentPage.css'; // Import CSS for styling

// const StudentPage = () => {
//     const [students, setStudents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [newStudent, setNewStudent] = useState({
//         name: '',
//         email: '',
//         course: '',
//         year: ''
//     });

//     useEffect(() => {
//         fetchStudents();
//     }, []);

//     const fetchStudents = () => {
//         axios.get('http://localhost:3001/students')
//             .then(response => {
//                 setStudents(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 setError('Error fetching students');
//                 setLoading(false);
//             });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewStudent({ ...newStudent, [name]: value });
//     };

//     const handleAddStudent = (e) => {
//         e.preventDefault();
//         if (newStudent.name && newStudent.email && newStudent.course && newStudent.year) {
//             axios.post('http://localhost:3001/students', newStudent)
//                 .then(() => {
//                     fetchStudents();
//                     setNewStudent({ name: '', email: '', course: '', year: '' });
//                 })
//                 .catch(error => {
//                     setError('Error adding student');
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
//         <div className="student-page">
//             <h1>Student Management</h1>
//             <form onSubmit={handleAddStudent} className="student-form">
//                 <h2>Add New Student</h2>
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Name"
//                     value={newStudent.name}
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={newStudent.email}
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="text"
//                     name="course"
//                     placeholder="Course"
//                     value={newStudent.course}
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="number"
//                     name="year"
//                     placeholder="Year"
//                     value={newStudent.year}
//                     onChange={handleInputChange}
//                 />
//                 <button type="submit">Add Student</button>
//             </form>
//             <h2>Student List</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Course</th>
//                         <th>Year</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {students.map(student => (
//                         <tr key={student.student_id}>
//                             <td>{student.student_id}</td>
//                             <td>{student.name}</td>
//                             <td>{student.email}</td>
//                             <td>{student.course}</td>
//                             <td>{student.year}</td>
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

// export default StudentPage;

// src/pages/StudentPage.js
import React, { useState, useEffect, useOptimistic } from 'react';
import axios from 'axios';
import './StudentPage.css';

const StudentPage = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newStudent, setNewStudent] = useState({
        name: '',
        email: '',
        course: '',
        year: ''
    });

    // Optimistic UI updates for better UX
    const [optimisticStudents, setOptimisticStudents] = useOptimistic(students);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3001/students');
                setStudents(response.data);
            } catch (err) {
                setError('Error fetching students');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent(prev => ({ ...prev, [name]: value }));
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        if (!newStudent.name || !newStudent.email || !newStudent.course || !newStudent.year) return;

        try {
            // Optimistically update UI
            setOptimisticStudents(prev => [...prev, { ...newStudent, id: Date.now() }]);

            // Send request to backend
            await axios.post('http://localhost:3001/students', newStudent);
            const response = await axios.get('http://localhost:3001/students');
            setStudents(response.data);
            setNewStudent({ name: '', email: '', course: '', year: '' });
        } catch {
            setError('Error adding student');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="student-page">
            <h1>Student Management</h1>
            <form onSubmit={handleAddStudent} className="student-form">
                <h2>Add New Student</h2>
                <input type="text" name="name" placeholder="Name" value={newStudent.name} onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" value={newStudent.email} onChange={handleInputChange} />
                <input type="text" name="course" placeholder="Course" value={newStudent.course} onChange={handleInputChange} />
                <input type="number" name="year" placeholder="Year" value={newStudent.year} onChange={handleInputChange} />
                <button type="submit">Add Student</button>
            </form>

            <h2>Student List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {optimisticStudents.map(student => (
                        <tr key={student.id || student.student_id}>
                            <td>{student.id || student.student_id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.course}</td>
                            <td>{student.year}</td>
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

export default StudentPage;
