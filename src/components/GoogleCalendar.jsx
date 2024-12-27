import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const GoogleCalendar = () => {
  const { isAuthenticated } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if gapi is available
    if (typeof window.gapi !== "undefined") {
      if (isAuthenticated) {
        // Initialize Google API client for fetching calendar events
        window.gapi.load("client", initClient);
      }
    } else {
      console.error("Google API client is not loaded.");
    }
  }, [isAuthenticated]);

  const initClient = () => {
    // Initialize the Google API client with the required parameters
    window.gapi.client
      .init({
        apiKey: "AIzaSyAFLygral_VHhaOX4OU5lLeoPFiJ6B3lWk", // Replace with your API key
        clientId:
          "566323464247-a1uuf8vshtfvmvracatlvdb2bif2a4ac.apps.googleusercontent.com", // Replace with your OAuth client ID
        scope: "https://www.googleapis.com/auth/calendar.readonly",
      })
      .then(() => {
        console.log("Google API client initialized.");
        listUpcomingEvents();
      })
      .catch((error) => {
        console.error("Error initializing Google API client:", error);
        setError("Failed to initialize Google API client.");
      });
  };

  const listUpcomingEvents = () => {
    setLoading(true);
    setError(null); // Reset any previous errors

    window.gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
      })
      .then((response) => {
        const events = response.result.items;
        setEvents(events);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events.");
        setLoading(false);
      });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Upcoming Google Calendar Events</h2>
      <div className="mt-4">
        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : events.length === 0 ? (
          <p>No upcoming events found.</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li key={event.id} className="mb-2">
                <strong>{event.summary}</strong>
                <p>
                  {new Date(
                    event.start.dateTime || event.start.date
                  ).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GoogleCalendar;
