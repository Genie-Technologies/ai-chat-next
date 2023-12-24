import React from 'react';
import { Modal, Button, Box, Typography, DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, CircularProgress } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function DeleteModal({
  open,
  onClose,
  handleDelete,
  deleteLoading
}: { open: boolean, onClose: () => void, handleDelete: (e: any) => void, deleteLoading: boolean }) {
  return (
    
    <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"Delete Confirmation"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
      Are you sure you want to delete this chat?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={handleDelete} autoFocus>
        Yes
        {deleteLoading && <CircularProgress size={20} />}
      </Button>
    </DialogActions>
  </Dialog>
  );
}

export default DeleteModal;