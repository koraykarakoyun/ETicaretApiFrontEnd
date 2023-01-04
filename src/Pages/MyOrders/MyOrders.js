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
export default function MyOrders() {
    const [datas, setDatas] = useState({ success: false, data: [] });
    const [IsConfirm, setIsConfirm] = useState(false);

    useEffect(() => {

        api("GET", "localhost", "7098", "orders", "getAllOrdersByUser", null, null).then((data) => {
            console.log(data.data);

            if (data.status == 401) {
                setDatas({ success: false, data: [] })
            }
            else {
                setDatas({ success: true, data: data.data })
            }

        });



    }, [])

    return (
        datas.success ? (

            <>
                <div style={{ margin: "auto", marginLeft: "15%", marginTop: "2%", marginBottom: "0", fontSize: "1.8rem" }}>
                    Siparişlerim
                </div>

                <Box style={{ marginLeft: "15%", marginTop: "2%", marginRight: "15%" }} sx={{ flexGrow: 1 }}>

                    <TableContainer component={Paper}>

                        <Table  >
                            <TableHead>
                                <TableRow>



                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {
                                    datas.data.map(element => (
                                        <>
                                            <TableRow
                                                key={element.orderCode}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                                            >
                                                <TableCell style={{ borderTop: "1px solid grey", display: "flex", justifyContent: "space-around" }}>
                                                    <div>
                                                        <div style={{ fontSize: "1rem", fontWeight: "bold" }}>
                                                            <span style={{ fontWeight: "normal" }}>SİPARİŞ NO:</span>{element.orderCode}
                                                        </div>
                                                        <br></br>
                                                        <div>
                                                            <span style={{ fontWeight: "bold" }}>Sipariş Tarihi:&nbsp;</span> {element.createdDate}
                                                            &nbsp;
                                                            &nbsp;
                                                            &nbsp;
                                                            &nbsp;
                                                            <span style={{ fontWeight: "bold" }}>Toplam Fiyat:&nbsp;</span>{element.totalPrice + " TL"}
                                                            &nbsp;
                                                            &nbsp;
                                                            &nbsp;
                                                            &nbsp;
                                                            <span style={{ fontWeight: "bold" }}>Ürün Adedi:</span>&nbsp;{element.productQuantity + ""}
                                                        </div>

                                                    </div>
                                                    <Link to={"/myorders/"+element.orderCode}>
                                                        <Button>
                                                            Sipariş Detayı
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow
                                                key={element.orderCode}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell style={{ display: "flex", width: "50%", borderBottom: "0", marginBottom: "10px" }}>
                                                    {
                                                        element.paths.map((element) => (
                                                            <CardMedia
                                                                component="img"
                                                                src={
                                                                    `http://127.0.0.1:8887/${element}`
                                                                }
                                                                style={{ margin: "1rem", height: "5rem", objectFit: "fill", justifyContent: "center", alignItems: "center" }}
                                                            />
                                                        ))
                                                    }
                                                </TableCell>
                                            </TableRow>

                                        </>

                                    ))
                                }

                            </TableBody>
                        </Table>

                    </TableContainer >

                </Box>
            </>
        ) : (null)
    );
}
