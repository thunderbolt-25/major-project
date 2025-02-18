// src/components/CalendarComponent.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'; // Import custom CSS for styling

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className="calendar-container">
            <Calendar
                onChange={setDate}
                value={date}
                tileClassName={({ date, view }) => {
                    if (view === 'month' && date.getDay() === 0) {
                        return 'highlight';
                    }
                }}
            />
        </div>
    );
};

export default CalendarComponent;