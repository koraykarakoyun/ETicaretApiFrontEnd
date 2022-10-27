import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { IconButton } from '@mui/material';
/*
buttonName:"" 
or
icon:{},
DialogTitle:"",
DialogContent:"",
apifunction:{}
*/
export default function ConfirmDialog(props) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {
                props.icon ? (
                    <IconButton onClick={handleClickOpen} component="label">
                        {props.icon}
                    </IconButton>
                ) : (
                    <Button variant="outlined" onClick={handleClickOpen}>
                        {props.buttonName}
                    </Button>
                )
            }

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {props.DialogTitle}
                </DialogTitle>
                <DialogContent>
                    {props.DialogContent}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        props.apifunction()
                        handleClose()
                    }}>Evet</Button>
                    <Button onClick={() => {
                        handleClose()
                    }}>Hayır</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
