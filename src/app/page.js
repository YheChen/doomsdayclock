"use client";

import { useState, useEffect } from "react";
import Countdown from "../components/countdown";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [className, setClassName] = useState("");
  const [eventDate, setEventDate] = useState("");

  // Load events from localStorage on component mount
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  // Update localStorage whenever events change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  const handleClassNameChange = (e) => setClassName(e.target.value);
  const handleEventDateChange = (e) => setEventDate(e.target.value);

  const addEvent = () => {
    if (className && eventDate) {
      const newEvent = { className, eventDate: new Date(eventDate) };
      setEvents([...events, newEvent]);
      setClassName("");
      setEventDate("");
    }
  };

  const clearEvents = () => {
    setEvents([]);
    localStorage.removeItem("events"); // Remove events from localStorage
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addEvent();
    }
  };

  const removeEvent = (index) => {
    const newEvents = events.filter((_, i) => i !== index);
    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents)); // Update localStorage
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Exam Doomsday Clock
      </h1>

      <div className="mb-6">
        <input
          type="text"
          id="className"
          value={className}
          onChange={handleClassNameChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter Exam Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6 flex items-center space-x-4">
        {/* Clear button on the left */}
        <button
          onClick={clearEvents}
          className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
        >
          Clear
        </button>
        <input
          type="datetime-local"
          id="eventDate"
          value={eventDate}
          onChange={handleEventDateChange}
          onKeyDown={handleKeyDown} // Listen for Enter key
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addEvent}
          className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
        >
          Add
        </button>
      </div>

      <div className="mt-8">
        {events.map((event, index) => (
          <Countdown
            key={index}
            className={event.className}
            examDate={event.eventDate}
            onRemove={() => removeEvent(index)} // Pass remove function
          />
        ))}
      </div>
    </div>
  );
}
