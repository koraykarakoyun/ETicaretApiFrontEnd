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
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CategorySelecter from '../../Components/CategorySelecter/CategorySelecter';
import { useAlert } from 'react-alert'
import { types } from 'react-alert'

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
    const alert = useAlert()
    const divMargin = {
        marginBottom: "4%"
    }

    const floatRight={
        float: "right"
    }
    const [open, setOpen] = React.useState(false);
    const [product, setProduct] = React.useState({ success: false, data: [] });
    const [categoryid, setCategoryId] = React.useState(product.data.categoryId);
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

    const handleOpen = () => {
        setOpen(true);
    };
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
            "color": String(product_color),
            "categoryid": categoryid

        }
        api("PUT", "localhost", "7098", "products", "update", null, product).then(res => {
            if (res.isSuccess) {
                alert.show(res.message, { type: types.SUCCESS })
            }
            else {
                alert.show(res.message, { type: types.ERROR })
            }
        })
        setOpen(false);
    };



    return (
        <div>
            <ToastContainer />
            <IconButton aria-label="delete" onClick={handleOpen}>
                <AutorenewIcon></AutorenewIcon>
            </IconButton>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Ürün Güncelleme
                </BootstrapDialogTitle>
                <DialogContent style={{ width: "100%" }} dividers>
               

                        <form  style={{ width: "100%" }} onSubmit={Update}>

                            <div style={divMargin} >
                                İsim:<input style={floatRight}  id='product_name' defaultValue={product.data.productName} type="text" />
                            </div>
                            <div style={divMargin}>
                                Stok:<input style={floatRight}  id='product_stock' defaultValue={product.data.productStock} type="text" />
                            </div>
                            <div style={divMargin}>
                                Fiyat:<input style={floatRight}  id='product_price' defaultValue={product.data.productPrice} type="text" />
                            </div>

                            <div style={divMargin}>
                                Marka:<input style={floatRight}  id='product_brand' defaultValue={product.data.productBrand} type="text" />
                            </div>

                            <div style={divMargin}>
                                Model:<input style={floatRight}  id='product_model' defaultValue={product.data.productModel} type="text" />
                            </div>
                            <div style={divMargin}>
                                Açıklama:<input style={floatRight}  id='product_description' defaultValue={product.data.productDescription} type="text" />
                            </div>
                            <div style={divMargin}>
                                Renk:<input style={floatRight}  id='product_color' defaultValue={product.data.productColor} type="text" />
                            </div>
                            <CategorySelecter categoryId={product.data.categoryId} setCategoryId={setCategoryId} ></CategorySelecter>
                        </form>


               
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={Update}>
                        Seçimi Onayla
                    </Button>
                    <Button autoFocus onClick={handleClose}>
                        Kapat
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
