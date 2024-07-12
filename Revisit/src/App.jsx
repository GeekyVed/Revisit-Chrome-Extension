import React, { useState, useEffect } from 'react';
import ReminderForm from './components/ReminderForm';
import ReminderList from './components/ReminderList';

function App() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    // Load reminders from Chrome storage when the app starts
    chrome.storage.sync.get(['reminders'], (result) => {
      if (result.reminders) {
        setReminders(result.reminders);
      }
    });
  }, []);

  const addReminder = (reminder) => {
    const updatedReminders = [...reminders, reminder];
    setReminders(updatedReminders);
    
    // Save to Chrome storage
    chrome.storage.sync.set({ reminders: updatedReminders });

    // Set up alarm for the reminder
    chrome.alarms.create(reminder.id, { when: reminder.time });
  };

  return (
    <div className="App">
      <h1>Reminder Extension</h1>
      <ReminderForm addReminder={addReminder} />
      <ReminderList reminders={reminders} />
    </div>
  );
}

export default App;