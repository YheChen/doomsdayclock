"use client";

import { useState } from "react";
import Countdown from "../components/Countdown";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [className, setClassName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleClassNameChange = (e) => setClassName(e.target.value);
  const handleEventDateChange = (e) => setEventDate(e.target.value);

  const addEvent = () => {
    if (className && eventDate) {
      setEvents([...events, { className, eventDate: new Date(eventDate) }]);
      setClassName(""); // Clear class name input
      setEventDate(""); // Clear date input
    }
  };

  return (
    <div>
      <h1>Upcoming Event Countdown</h1>

      <label htmlFor="className">Class Name:</label>
      <input
        type="text"
        id="className"
        value={className}
        onChange={handleClassNameChange}
        placeholder="Enter class name"
      />
      <br />
      <label htmlFor="eventDate">Event Date and Time:</label>
      <input
        type="datetime-local"
        id="eventDate"
        value={eventDate}
        onChange={handleEventDateChange}
      />
      <br />
      <button onClick={addEvent}>Add Event</button>

      {events.map((event, index) => (
        <Countdown
          key={index}
          className={event.className}
          examDate={event.eventDate}
        />
      ))}
    </div>
  );
}
