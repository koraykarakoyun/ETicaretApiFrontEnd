import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';

export default function NewDialog(props) {
    const [open, setOpen] = React.useState(true);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        props.setIsConfirm(false)
    })
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    NewDİALOG
                </DialogTitle>
                <DialogContent>
                NewDİALOG
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        props.setIsConfirm(true)
                        handleClose()
                    }}>Evet</Button>
                    <Button onClick={() => {
                        props.setIsConfirm(false)
                        handleClose()
                    }}>Hayır</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
