import React, { useState, useEffect } from 'react';
import './SwitchButton.css'; // Import the CSS file
import './Input.css'; // Import the CSS file
import './Button.css'; // Import the CSS file

function ReminderForm({ addReminder }) {
  const [link, setLink] = useState('');
  const [note, setNote] = useState('');
  const [time, setTime] = useState('');
  const [isTimer, setIsTimer] = useState(true);

  useEffect(() => {
    // Get current tab's URL
    if (chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          setLink(tabs[0].url);
        }
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let reminderTime;
    if (isTimer) {
      // Convert minutes to milliseconds and add to current time
      reminderTime = Date.now() + parseInt(time) * 60000;
    } else {
      // Use the date/time input directly
      reminderTime = new Date(time).getTime();
    }

    const reminder = {
      id: Date.now().toString(),
      link,
      note,
      time: reminderTime,
    };
    addReminder(reminder);
    setLink('');
    setNote('');
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Link"
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="input"
      />
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Note"
        className="input"
      />

      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        {/* // SwitchButton */}
        <label className="switch-button" htmlFor="switch">
          <div className="switch-outer">
            <input id="switch" type="checkbox" checked={isTimer} onChange={() => setIsTimer(!isTimer)} />
            <div className="button">
              <span className="button-toggle"></span>
              <span className="button-indicator"></span>
            </div>
          </div>
        </label>

        {isTimer ? (
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Minutes"
            className="input"
          />
        ) : (
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input"
          />
        )}</div>

      <button type="submit" class="buttonLo type1">
        <span class="btn-txt">Add Reminder</span>
      </button>

    </form>
  );
}

export default ReminderForm;