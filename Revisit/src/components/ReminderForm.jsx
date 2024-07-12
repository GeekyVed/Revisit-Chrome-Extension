import React, { useState, useEffect } from 'react';

function ReminderForm({ addReminder }) {
  const [link, setLink] = useState('');
  const [note, setNote] = useState('');
  const [time, setTime] = useState('');
  const [isTimer, setIsTimer] = useState(true);

  useEffect(() => {
    // Get current tab's URL
    if (chrome.tabs) {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
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
        type="text" 
        value={link} 
        onChange={(e) => setLink(e.target.value)} 
        placeholder="Link"
      />
      <input 
        type="text" 
        value={note} 
        onChange={(e) => setNote(e.target.value)} 
        placeholder="Note"
      />
      <button type="button" onClick={() => setIsTimer(!isTimer)}>
        {isTimer ? 'Timer' : 'Date/Time'}
      </button>
      {isTimer ? (
        <input 
          type="number" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
          placeholder="Minutes"
        />
      ) : (
        <input 
          type="datetime-local" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
        />
      )}
      <button type="submit">Add Reminder</button>
    </form>
  );
}

export default ReminderForm;