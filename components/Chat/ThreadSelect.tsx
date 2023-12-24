import React, { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Threads } from "../../services/ThreadService/Threads.service";
import CircularProgress from '@mui/material/CircularProgress';


const ThreadSelect = ({ threads, selectedThread, setThreadId  }: { threads: Threads[], selectedThread?: string, setThreadId?: (id: string) => void}) => {
  const [loading, setLoading] = useState(false);

  const handleThreadSelect = async (event: SelectChangeEvent<string>) => {
    setLoading(true);
    if (setThreadId) setThreadId(event.target.value);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/save-msgs-embeddings`, {
        method: 'POST',
        body: JSON.stringify({ threadId: event.target.value }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="thread-select-label">Threads</InputLabel>
      <Select
        labelId="thread-select-label"
        id="thread-select"
        label="Threads"
        value={selectedThread}
        onChange={handleThreadSelect}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 0.5 }}>
            {selected && threads.find((thread) => thread.id === selected)?.threadName}
            {loading && <CircularProgress size={10} />}
          </Box>
        )}
      >
        {threads.map((thread, index) => (
          <MenuItem key={index} value={thread.id}>
            {thread.threadName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ThreadSelect;
