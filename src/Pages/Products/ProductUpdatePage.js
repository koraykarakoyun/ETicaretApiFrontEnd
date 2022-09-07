import React, { useState, useEffect } from 'react';
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
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../Utilities/Api';
import { notify } from '../../Utilities/Notify';


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

export default function ProductUpdate(props) {
    let { id } = useParams();
    const [deger, setDeger] = useState([]);
    useEffect(() => {
        if (id != null) {
            api("GET", "localhost", "7098", "products", "getbyid", id).then((data) => {
                setDeger(data);
            });
        }

    }, [])

    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };
    const Add = () => {
        var product_id = document.getElementById("product_id").value;
        var product_name = document.getElementById("product_name").value;
        var product_stock = document.getElementById("product_stock").value;
        var product_price = document.getElementById("product_price").value;
        var product = {
            "name": String(product_name),
            "stock": Number(product_stock),
            "price": Number(product_price)

        }
        api("PUT", "localhost", "7098", "products", "updatebyid", String(product_id), product);
        setOpen(false);
    };


    const changeid = () => {
        var product_id = document.getElementById("product_id").value;
        api("GET", "localhost", "7098", "products", "getbyid", product_id).then(response => {
            document.getElementById("product_name").value = response.name;
            document.getElementById("product_stock").value = response.stock;
            document.getElementById("product_price").value = response.price;
        })

    }


    return (
        <div>
            <ToastContainer />
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Product Update
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>

                        <form onSubmit={Add}>
                            <label>
                                UpdateProductId:<input id='product_id' onChange={changeid} defaultValue={id} type="text" />
                            </label>
                            <label>
                                NewName:<input id='product_name' defaultValue={deger.name} type="text" />
                            </label>
                            <label>
                                NewStock:<input id='product_stock' defaultValue={deger.stock} type="number" />
                            </label>
                            <label>
                                NewPrice:<input id='product_price' defaultValue={deger.price} type="number" />
                            </label>
                        </form>


                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={Add}>
                        Update
                    </Button>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
