import React from 'react';

const RemindersList = ({ reminders }) => {
  return (
    <div>
      <h2>Reminders</h2>
      <ul>
        {reminders.map((reminder, index) => (
          <li key={index}>
            <a href={reminder.link} target="_blank" rel="noopener noreferrer">
              {reminder.link}
            </a>
            <p>{reminder.note}</p>
            <p>
              {reminder.useTimer
                ? `In ${reminder.time} minutes`
                : `At ${new Date(reminder.time).toLocaleString()}`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RemindersList;
