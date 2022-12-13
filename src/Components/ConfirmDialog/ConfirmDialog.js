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
handleclickfunction:()=>{},

DialogTitle:"",
DialogContent:"",
apifunction:{}
Button1:"",
Button2:"",

*/
export default function ConfirmDialog(props) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        if (props.handleclickfunction!= undefined) {
            props.handleclickfunction();
        }
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
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
                    }}>{props.Button1}</Button>
                    <Button onClick={() => {
                        handleClose()
                    }}>{props.Button2}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
