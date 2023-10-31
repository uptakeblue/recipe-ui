import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material//DialogTitle';
import { Paper } from '@mui/material';

const ContentDialog = (props) => {
    const {
        dialogOpen,
        setDialogOpen,
        content,
    } = props;


    return (
        <>
            {
                content &&
                <Dialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                >
                    <Paper >
                        {content.title}
                    </Paper>
                </Dialog>
            }
        </>
    )
}
export default ContentDialog;