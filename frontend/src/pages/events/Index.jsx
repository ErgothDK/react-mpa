import React from "react";
import { Link } from "react-router-dom";
const DUMMY_EVENTS = [
  {
    id: Math.random().toFixed(3) * 1000,
    title: "DUMMY EVENT",
  },
  {
    id: Math.random().toFixed(3) * 1000,
    title: "EVENT OF THE YEAR",
  },
  {
    id: Math.random().toFixed(3) * 1000,
    title: "GREAT EVENT",
  },
  {
    id: Math.random().toFixed(3) * 1000,
    title: "THE BEST EVENT",
  },
  {
    id: Math.random().toFixed(3) * 1000,
    title: "EXPENSIVE EVENT",
  },
];
const EventsPage = () => {
  return (
    <ul>
      {DUMMY_EVENTS.map((event) => (
        <li key={event.id}>
          <Link to={`/events/${event.id}`}>{event.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default EventsPage;
