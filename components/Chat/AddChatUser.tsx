import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import FormHelperText from '@mui/material/FormHelperText';
import { CircularProgress } from '@mui/material';

import UserService, { User } from "../../services/UserService/User.service";
import ThreadService, {
  Threads,
} from "../../services/ThreadService/Threads.service";

const userService = new UserService();
const threadService = new ThreadService();

const getFullName = (user: User) => {
  if (!user.fullName) {
    return `${user.firstName} ${user.lastName}`
  }; 

  return user.fullName;
};

export default function AddChatUser({ threadId, setThreads, userId, setCurrentThread }: { threadId: string, setThreads: Function, userId: string, setCurrentThread: Function }) {
  const [threadName, setThreadName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [threadNameError, setThreadNameError] = useState('');
  const [selectedUsersError, setSelectedUsersError] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setLoading(true);

    (async () => {
      let usrs = await userService.getUsers();

      if (usrs && usrs.length > 0) {
        
        usrs = usrs.map((u: User) => {
          // Filter out the current user
          if (u.id !== userId) {
            return { ...u, fullName: getFullName(u) }
          }
        }).filter(Boolean);
        setUsers(usrs);
      }
      setLoading(false);
    })();
  }, [userId]);

  const handleThreadNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThreadName(event.target.value);
    if (event.target.value.trim() !== '') {
      setThreadNameError('');
    }
  };

  const handleUserSelectChange = (event: SelectChangeEvent<typeof selectedUsers>) => {
    const value = event.target.value;

    setSelectedUsers(typeof value === 'string' ? value.split(',') : value);
    if (value.length > 0) {
      setSelectedUsersError('');
    }
  };

  const handleThreadNameBlur = () => {
    if (threadName.trim() === '') {
      setThreadNameError('Please enter a thread name.');
    }
  };

  const handleUserSelectBlur = () => {
    if (selectedUsers.length === 0) {
      setSelectedUsersError('Please select at least one member.');
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    const thread = await threadService.updateThread({
      id: threadId,
      threadName,
      participants: selectedUsers,
    });

    if (thread) {
      setThreadName('');
      setSelectedUsers([]);

      // replace old thread with new thread
      setThreads((prevThreads: Threads[]) => {
        const newThreads = [...prevThreads];
        const index = newThreads.findIndex((t) => t.id === thread.id);
        if (index > -1) {
          newThreads[index] = thread;
        }
        return newThreads;
      });
      setCurrentThread(thread);
    }
  }

  const isSubmitEnabled = threadName.trim() !== '' && selectedUsers.length > 0;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, margin: '0 auto' }}>
      {loading && (
        <Box sx={{ height: 75, display: 'flex', alignSelf: 'flex-start' }}>
          <CircularProgress  style={{ margin: 'auto'}} />
        </Box>
      )}

      <FormControl sx={{ m: 1, width: 300 }} error={!!selectedUsersError}>
        <InputLabel id="mutiple-chip-label">Add Member</InputLabel>
        <Select
          labelId="mutiple-chip-label"
          multiple
          value={selectedUsers}
          onChange={handleUserSelectChange}
          onBlur={handleUserSelectBlur}
          input={<OutlinedInput id="select-multiple-chip" label="Add Member" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => {
                const user = users.find((u) => u.id === value);
                return (
                <Chip key={user?.id} label={user?.fullName} sx={{ height: 20 }} />
              )})}
            </Box>
          )}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.fullName}
            </MenuItem>
          ))}
        </Select>
        {selectedUsersError && <FormHelperText>{selectedUsersError}</FormHelperText>}
      </FormControl>

      <TextField
        label="Thread Name"
        variant="outlined"
        value={threadName}
        onChange={handleThreadNameChange}
        onBlur={handleThreadNameBlur}
        error={!!threadNameError}
        helperText={threadNameError}
      />

      <Box sx={{ height: 75, display: 'flex', alignSelf: 'flex-start' }}>
        <Button variant="contained" disabled={!isSubmitEnabled} style={{ margin: 'auto'}} onClick={handleSubmit}>
            Submit
        </Button>
      </Box>
    </Box>
  );
}
