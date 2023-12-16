import { MouseEventHandler, useState } from "react";

import { Button, IconButton, styled, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PushPinIcon from "@mui/icons-material/PushPinRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from '@mui/material/CircularProgress';
import { LogoutRounded } from "@mui/icons-material";
import Link from "next/link";

import ThreadService, { Threads } from "../../services/ThreadService/Threads.service";
import { User } from "../../services/UserService/User.service";
import { stringAvatar } from "../utils";
import DeleteModal from "./DeleteChat";

const threadService = new ThreadService();

let deleteId: string | null = null;

export default function ChatsList({
  threads,
  setCurrentThread,
  openDrawer,
  user,
  setThreads,
}: {
  threads: Threads[];
  currentThread: Threads | null;
  user: User;
  setCurrentThread: (threadId: string | null) => void;
  openDrawer: boolean;
  setThreads: React.Dispatch<React.SetStateAction<Threads[]>>;
}) {
  const theme = useTheme();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newChatLoading, setNewChatLoading] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const onSetSelectedThread = (id: string | null) => {
    setSelectedId(id);
    setCurrentThread(id);
  };

  const ChosenListItemStyles = {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.contrastText,
    borderRadius: "10px",
    transition: "all 1s ease",
  };

  const ListItemStyles = {
    transition: "all 1s ease",
    "&:hover": {
      cursor: "pointer",
      boxShadow: `rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px`,
    },
    borderRadius: "10px",
  };

  const HoverStyles = {
    "&:hover": {
      cursor: "pointer",
      boxShadow: `rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px`,
      '& > svg': {
              display: 'block',
            },
       },
      };

  const handleCreateNewChat = async () => {
    setNewChatLoading(true);
    // fetch messages for threadId
    const newThread = await threadService.createThread({
      createdAt: new Date().toISOString(),
      isActive: false,
      userId: user.id,
    });

    if (newThread) {
      setNewChatLoading(false);
      setThreads(threads => [...threads, newThread]);
    }
  }

  const handleDelete = async (e:  any, id?: string) => {
    if (id) {
      deleteId = id;
      e.stopPropagation();
      setDeleteOpen(true);
      return;
    }

    setDeleteLoading(true);
    try {
      const deleted = await threadService.deleteThread(deleteId as string);

      // update thread list
      if (deleted) {
        setThreads(threads => threads.filter((thread) => thread.id !== deleteId));

        if (selectedId === deleteId) onSetSelectedThread(null);
      }
      setDeleteLoading(false);
      setDeleteOpen(false);
    } catch(e) {
      console.log('ERROR DELETING', e);
    }
  }

  const renderThreads = (drawerOpen: boolean): JSX.Element[] | JSX.Element => {
    if (!threads && !drawerOpen) {
      return [];
    }

    if (!threads && drawerOpen) {
      return (
        <ListItem alignItems="flex-start" sx={ListItemStyles}>
          <ListItemAvatar>
            <Avatar alt="Loading..." />
          </ListItemAvatar>
          <ListItemText primary="Loading..." />
        </ListItem>
      );
    }

    if (!threads.length && drawerOpen) {
      return (
        <ListItem alignItems="flex-start" sx={ListItemStyles}>
          <ListItemAvatar>
            <Avatar alt="No chats" />
          </ListItemAvatar>
          <ListItemText primary="No chats yet." />
        </ListItem>
      );
    }

    if (drawerOpen) {
      return threads.map((item, idx) => {
        return (
          <ListItem
            alignItems="flex-start"
            sx={selectedId === item.id ? { ...ChosenListItemStyles, ...HoverStyles} : { ...ListItemStyles, ...HoverStyles }}
            key={idx}
            onClick={() => onSetSelectedThread(item.id)}
          >
            <ListItemAvatar>
              <Avatar
                alt={item.threadName}
                {...stringAvatar(item.threadName || "New Chat")}
              />
            </ListItemAvatar>
            <ListItemText
              primary={item.threadName || "New Chat"}
              secondary={
                <Typography
                  sx={{
                    display: "inline",
                    wordWrap: "break-word",
                  }}
                  component="p"
                  variant="caption"
                  color={theme.palette.secondary.light}
                  textOverflow={"ellipsis"}
                >
                  {item.lastMessage || "No messages"}
                </Typography>
              }
            />
            <DeleteIcon
              sx={{
                display: 'none',
                margin: 'auto',
                color: 'white',
                cursor: 'pointer',
              }}
              onClick={(e) => handleDelete(e, item.id)}
            />
          </ListItem>
        );
      });
    } else {
      return threads.map((item, idx) => {
        // Just return the icons for when the drawer is closed
        return (
          <ListItem
            alignItems="flex-start"
            sx={selectedId === item.id ? ChosenListItemStyles : ListItemStyles}
            key={idx}
            onClick={() => onSetSelectedThread(item.id)}
          >
            <ListItemAvatar>
              <Avatar
                alt={item.threadName}
                {...stringAvatar(item.threadName || "New Chat")}
              />
            </ListItemAvatar>
            <ListItemText
              primary={item.threadName}
              secondary={
                <Typography
                  sx={{
                    display: "inline",
                    wordWrap: "break-word",
                  }}
                  component="p"
                  variant="caption"
                  color={theme.palette.secondary.light}
                  textOverflow={"ellipsis"}
                >
                  {item.lastMessage || "New Chat"}
                </Typography>
              }
            />
          </ListItem>
        );
      });
    }

    return [];
  };

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        overflow: "auto",
        backgroundColor: theme.palette.background.default,
        overflowX: "hidden",
      }}
    >
      <Stack spacing={0}>
        {openDrawer ? (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateNewChat}
            sx={{
              transition: "all 0.5s ease",
              maxWidth: "100%",
              margin: "10px",
            }}
            disabled={newChatLoading}
          >
            New Chat {newChatLoading && <CircularProgress size={20} sx={{
              marginLeft: "8px",
            }} />}
          </Button>
        ) : (
          // Show an IconButton for when the drawer is closed
          <IconButton
            onClick={handleCreateNewChat}
            sx={{
              transition: "all 2s ease",
            }}
            disabled={newChatLoading}
          >
            {newChatLoading ? <CircularProgress size={20} /> : <AddIcon />}
          </IconButton>
        )}
        <List>
          {/** Have a pinned chat item at the top for AI chat */}
          <ListItem
            alignItems="flex-start"
            sx={selectedId === null ? ChosenListItemStyles : ListItemStyles}
            onClick={() => onSetSelectedThread(null)}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                <PushPinIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Talk to "
              primaryTypographyProps={{
                sx: {
                  fontWeight: "bold",
                  fontSize: "1rem",
                },
              }}
              secondary="ResponAi"
              secondaryTypographyProps={{
                sx: {
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: theme.palette.secondary.dark,
                },
              }}
            />
          </ListItem>

          {renderThreads(openDrawer)}
        </List>

        <Link href="/api/auth/logout" style={{ textDecoration: "none" }}>
          {openDrawer ? (
            <Button
              variant="contained"
              onClick={() => {
                window.location.reload();
              }}
              sx={{
                transition: "all 0.5s ease",
                maxWidth: "80%",
                margin: "10px",
              }}
            >
              Logout
            </Button>
          ) : (
            <IconButton
              sx={{
                transition: "all 2s ease",
              }}
            >
              <LogoutRounded />
            </IconButton>
          )}
        </Link>
        <DeleteModal open={deleteOpen} onClose={() => setDeleteOpen(false)} handleDelete={handleDelete} deleteLoading={deleteLoading}  />
      </Stack>
    </Paper>
  );
}
