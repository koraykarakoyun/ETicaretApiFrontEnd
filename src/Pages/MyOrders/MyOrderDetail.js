import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../../Utilities/Api';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
import ConfirmDialog from '../../Components/ConfirmDialog/ConfirmDialog';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import MainPage from '../../Pagination/MainPage';
import { useParams } from "react-router-dom";
export default function MyOrderDetail(props) {
    const [datas, setDatas] = useState({ success: false, data: [] });
    const [IsConfirm, setIsConfirm] = useState(false);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    let { ordercode } = useParams();
    useEffect(() => {

        api("GET", "localhost", "7098", "orders", "GetByIdUserOrderDetail", ordercode, null).then((data) => {
    
            if (data.status == 401) {
                setDatas({ success: false, data: [] })
            }
            else {
                setDatas({ success: true, data: data.data })
            }

        });



    }, [ordercode])

    return (

        datas.success ? (

            <>
                <div style={{ margin: "auto", marginLeft: "15%", marginTop: "2%", marginBottom: "0", fontSize: "1.8rem" }}>
                    Sipariş Detayı
                </div>

                <div style={{ margin: "auto", marginLeft: "15%", marginTop: "2%", marginBottom: "0", fontSize: "1.2rem" }}>
                    Sipariş No: {datas.data.orderCode}
                </div>

                <div style={{ margin: "auto", marginLeft: "15%", marginTop: "2%", marginBottom: "0", fontSize: "1.2rem" }}>
                    Sipariş Tarihi: {datas.data.orderCreatedDate}
                </div>
                <div style={{ margin: "auto", marginLeft: "15%", marginTop: "2%", marginBottom: "0", fontSize: "1.2rem" }}>
                    Sipariş Toplamı: {datas.data.totalPrice} TL
                </div>

                <Box style={{ marginLeft: "15%", marginTop: "2%", marginRight: "15%" }} sx={{ flexGrow: 1 }}>
                    <TableContainer component={Paper}>
                        <Table  >
                            <TableHead>
                                <TableRow>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell >
                                        <span style={{ fontWeight: "bold" }}>&nbsp;</span> Toplam Ürün Sayısı: {datas.data.totalProductCount} Adet
                                    </TableCell>
                                </TableRow>
                                {
                                    datas.data.productInfo.map(element => (
                                        <>

                                            <TableRow
                                                key={element.orderCode}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >

                                                <TableCell>

                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Grid container spacing={2}>

                                                            <Grid item xs={2}>

                                                                <CardMedia
                                                                    component="img"
                                                                    src={
                                                                        `http://127.0.0.1:8887/${element.paths}`
                                                                    }
                                                                    style={{ height: "100%", objectFit: "fill", display: "inline" }}
                                                                />

                                                            </Grid>
                                                            <Grid item xs={6}>

                                                                <div style={{ marginBottom: "1.5rem" }}>
                                                                    {element.productName}
                                                                </div>
                                                                <div style={{ marginBottom: "4rem" }}>
                                                                    Model:{element.productBrand} / {element.productModel}
                                                                </div>
                                                                <div>
                                                                    Renk: {element.productColor}
                                                                </div>

                                                            </Grid>

                                                            <Grid item style={{ display: "flex", alignItems: "center" }} xs={4}>
                                                                <Grid container spacing={1}>

                                                                    <Grid item xs={4}>

                                                                        {element.productQuantity} Adet
                                                                    </Grid>
                                                                    <Grid item xs={8}>

                                                                        Birim Fiyat: {element.productPrice} TL
                                                                    </Grid>


                                                                </Grid>




                                                            </Grid>
                                                        </Grid>
                                                    </Box>




                                                </TableCell>

                                            </TableRow>

                                        </>

                                    ))
                                }

                                <TableRow

                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >



                                    <TableCell>


                                        <div style={{ marginBottom: "1rem",fontSize:"1.3rem" }}>
                                            Sipariş Detayı Bilgileri:
                                        </div>

                                        <Box sx={{ flexGrow: 1 }}>
                                            <Grid container spacing={2}>

                                                <Grid item xs={4}>
                                                    <div style={{ marginBottom: "1rem" }}>
                                                        Teslimat Adresi:
                                                    </div>
                                                    {
                                                        datas.data.orderAddress
                                                    }
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <div style={{ marginBottom: "1rem" }}>
                                                        Sipariş Açıklaması:
                                                    </div>
                                                    {
                                                        datas.data.orderDescription
                                                    }
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <div style={{ marginBottom: "1rem" }}>
                                                        Toplam Fiyat:
                                                    </div>
                                                    {datas.data.totalPrice} TL

                                                </Grid>

                                            </Grid>
                                        </Box>
                                    </TableCell>


                                </TableRow>
                            </TableBody>
                        </Table>

                    </TableContainer >

                </Box>
            </>
        ) : (null)
    );
}
