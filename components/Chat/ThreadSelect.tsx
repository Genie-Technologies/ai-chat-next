import React, { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ThreadSelect = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    // Fetch threads from your API and set them in state
    // This is just a placeholder, replace with your actual API call
    fetch('/api/threads')
      .then(response => response.json())
      .then(data => setThreads(data));
  }, []);

  return (
    <Select
      labelId="thread-select-label"
      id="thread-select"
      value={threads[0]}
      onChange={(event) => {
        console.log(event.target.value);
      }}
    >
      {threads.map((thread, index) => (
        <MenuItem key={index} value={thread}>
          {thread}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ThreadSelect;
