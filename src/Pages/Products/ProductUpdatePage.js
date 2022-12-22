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


    const [open, setOpen] = React.useState(true);
    const [product, setProduct] = React.useState({ success: false, data: [] });

    useEffect(() => {

        api("GET", "localhost", "7098", "products", "getbyid", props.productid, null).then((data) => {
            if (data.status == 401) {
                setProduct({ success: false, data: [] })
            }
            else {
                setProduct({ success: true, data: data })
            }

        });

    }, [props.productid])


    const handleClose = () => {
        setOpen(false);
    };
    const Update = () => {
        var product_name = document.getElementById("product_name").value;
        var product_stock = document.getElementById("product_stock").value;
        var product_price = document.getElementById("product_price").value;

        var product_brand = document.getElementById("product_brand").value;
        var product_model = document.getElementById("product_model").value;
        var product_description = document.getElementById("product_description").value;
        var product_color = document.getElementById("product_color").value;
        var product = {
            "id": String(props.productid),
            "name": String(product_name),
            "stock": Number(product_stock),
            "price": Number(product_price),
            "brand": String(product_brand),
            "model": String(product_model),
            "description": String(product_description),
            "color": String(product_color)
        }
        props.setUpdateproduct(product);
        setOpen(false);
    };



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

                        <form onSubmit={Update}>

                            <label>
                                İsim:<input id='product_name' defaultValue={product.data.productId} type="text" />
                            </label>
                            <label>
                                Stok:<input id='product_stock' defaultValue={product.data.productStock} type="text" />
                            </label>
                            <label>
                                Fiyat:<input id='product_price' defaultValue={product.data.productPrice} type="text" />
                            </label>

                            <label>
                                Marka:<input id='product_brand' defaultValue={product.data.productBrand} type="text" />
                            </label>

                            <label>
                                Model:<input id='product_model' defaultValue={product.data.productModel} type="text" />
                            </label>
                            <label>
                                Açıklama:<input id='product_description' defaultValue={product.data.productDescription} type="text" />
                            </label>
                            <label>
                                Renk:<input id='product_color' defaultValue={product.data.productColor} type="text" />
                            </label>




                        </form>


                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={Update}>
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
