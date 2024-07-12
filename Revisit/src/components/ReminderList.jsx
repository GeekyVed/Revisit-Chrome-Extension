// components/ReminderList.js
import React from 'react';

function ReminderList({ reminders }) {
  return (
    <div>
      <h2>Your Reminders</h2>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id}>
            <a href={reminder.link} target="_blank" rel="noopener noreferrer">{reminder.link}</a>
            <p>{reminder.note}</p>
            <p>Reminder set for: {new Date(reminder.time).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReminderList;