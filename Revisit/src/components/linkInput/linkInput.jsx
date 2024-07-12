import React, { useState, useEffect } from 'react';

const LinkInput = ({ addReminder }) => {
  const [link, setLink] = useState('');
  const [note, setNote] = useState('');
  const [time, setTime] = useState('');
  const [useTimer, setUseTimer] = useState(false);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setLink(tabs[0].url);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addReminder({ link, note, time, useTimer });
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
        required
      />
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Notes"
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={useTimer}
            onChange={() => setUseTimer(!useTimer)}
          />
          Use Timer
        </label>
        {useTimer ? (
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Minutes"
            required
          />
        ) : (
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LinkInput;
