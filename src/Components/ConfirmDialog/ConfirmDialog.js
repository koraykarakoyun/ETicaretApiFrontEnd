import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';

export default function ConfirmDialog(props) {
    const [open, setOpen] = React.useState(false);
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
            <Button variant="outlined" onClick={handleClickOpen}>
                {props.buttonName}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    Dikkat!
                </DialogTitle>
                <DialogContent>
                    Islemi kaydetmek istediginize emin misiniz?
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
