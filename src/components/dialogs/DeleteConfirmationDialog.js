import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material//DialogTitle';

const DeleteConfirmationDialog = (props) => {
  const { message, open, setOpen, onDelete } = props;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='confirm-dialog'
    >
      <Box
        sx={{
          color: 'black',
          backgroundColor: 'white',
        }}
      >
        <DialogTitle id='confirm-dialog'>Confirm Dateitem Deletion</DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Box
            flexGrow={1}
            padding={2}
            display='flex'
            justifyContent='flex-end'
            alignItems='flex-end'
          >
            <Stack
              direction='row'
              spacing={1}
              alignItems='flex-end'
              justifyContent='flex-start'
            >
              <Button
                id='delete-button'
                variant='contained'
                size='small'
                onClick={() => {
                  setOpen(false);
                  onDelete();
                }}
              >
                Delete
              </Button>
              <Button
                id='cancel-button'
                variant='outlined'
                size='small'
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
