import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function ProductAdd(props) {
    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const Add = () => {
        var product_name = document.getElementById("product_name").value;
        var product_stock = document.getElementById("product_stock").value;
        var product_price = document.getElementById("product_price").value;


        var product = {
            "name": String(product_name),
            "stock": Number(product_stock),
            "price": Number(product_price)

        }

        props.api("POST","localhost","7098","products","add",null,product);

        console.log("eklendi");
        setOpen(false);
    };



    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Product Add
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>

                        <form onSubmit={Add}>
                            <label>
                                Name:<input id='product_name' type="text" />
                            </label>
                            <label>
                                Stock:<input id='product_stock' type="number" />
                            </label>
                            <label>
                                Price:<input id='product_price' type="number" />
                            </label>
                        </form>


                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={Add}>
                        Add
                    </Button>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
