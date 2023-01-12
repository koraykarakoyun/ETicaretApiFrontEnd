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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../Utilities/Api';
import { notify } from '../../Utilities/Notify';
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect } from 'react';
import CategorySelecter from '../../Components/CategorySelecter/CategorySelecter';
import AddIcon from '@mui/icons-material/Add';
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

    const divMargin = {
        marginBottom: "4%"
    }

    const floatRight={
        float: "right"
    }
    const [open, setOpen] = React.useState(false);
    const [categoryid, setCategoryId] = React.useState("");


    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const Add = async () => {
        var product_name = document.getElementById("product_name").value;
        var product_stock = document.getElementById("product_stock").value;
        var product_price = document.getElementById("product_price").value;
        var product_brand = document.getElementById("product_brand").value;
        var product_model = document.getElementById("product_model").value;
        var product_description = document.getElementById("product_description").value;
        var product_color = document.getElementById("product_color").value;
        const product = {
            "name": String(product_name),
            "stock": Number(product_stock),
            "price": Number(product_price),
            "brand": String(product_brand),
            "model": String(product_model),
            "description": String(product_description),
            "color": String(product_color),
            "categoryid": categoryid
        }
        console.log(product)
        api("POST", "localhost", "7098", "products", "add", null, product).then(res => notify(res.message))
        setOpen(false);
    };



    return (
        <div >
            <IconButton aria-label="delete" onClick={handleOpen}>
                <AddIcon></AddIcon>
            </IconButton>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                   Ürün Ekleme
                </BootstrapDialogTitle>
                <DialogContent style={{ width: "100%" }} dividers>


                    <form style={{ height: "100%" }} onSubmit={Add}>
                        <div style={divMargin}>
                            İsim:<input style={floatRight} id='product_name' type="text" />
                        </div>
                        <div style={divMargin}>
                            Stok:<input style={floatRight} id='product_stock' type="number" />
                        </div>
                        <div style={divMargin}>
                            Fiyat:<input style={floatRight}id='product_price' type="number" />
                        </div >

                        <div style={divMargin}>
                            Marka:<input style={floatRight} id='product_brand' type="text" />
                        </div>

                        <div style={divMargin}>
                            Model:<input style={floatRight} id='product_model' type="text" />
                        </div>
                        <div style={divMargin}>
                            Açıklama:<input style={floatRight} id='product_description' type="text" />
                        </div>
                        <div style={divMargin}>
                            Renk:<input style={floatRight} id='product_color' type="text" />
                        </div>
                        <CategorySelecter categoryid={categoryid} setCategoryId={setCategoryId}></CategorySelecter>
                    </form>



                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        Add()
                    }}>
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
