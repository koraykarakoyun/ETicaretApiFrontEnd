import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../Utilities/Api';
import { notify } from '../../Utilities/Notify';
import AddIcon from '@mui/icons-material/Add';
import FileUploadModelDialog from '../../Components/FileUploadModelDialog';
import ConfirmDialog from '../../Components/ConfirmDialog/ConfirmDialog';
import ReorderIcon from '@mui/icons-material/Reorder';
import OrderDetailPage from './OrderDetailPage';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from "react-router";
import ProductAdd from '../Products/ProductAddPage';
import ProductsPage from '../Products/ProductsPage';
import UnpublishedIcon from '@mui/icons-material/Unpublished';


export default function OrdersPage(props) {
    const [deger, setDeger] = useState({ success: false, data: [] });
    const navigate = useNavigate();
    useEffect(() => {

        api("GET", "localhost", "7098", "orders", "getallorders", null, null).then((data) => {
            console.log(data);
            if (data.status == 401) {
                console.log(data);
                setDeger({ success: false, data: [] })
            }
            else {
                setDeger({ success: true, data: data })
            }  
        });
    }, OrdersPage)



    return (


        deger.success ? (<div style={{ marginLeft: "0.1%" }} >
            <ToastContainer />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Sipariş Kod</TableCell>
                            <TableCell align="center">Kullanıcı</TableCell>
                            <TableCell align="center">Sipariş Tarihi</TableCell>
                            <TableCell align="center">Sipariş Durumu</TableCell>
                            <TableCell align="center">Sipariş Detayı</TableCell>
                            <TableCell align="center">Siparişi Sil</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (deger.data.map((row) => (
                                <TableRow key={row.orderBasketId}>
                                    <TableCell align="center">{row.orderCode}</TableCell>
                                    <TableCell align="center">{row.userName}</TableCell>
                                    <TableCell align="center">{row.createdDate}</TableCell>

                                    <TableCell align="center">{row.orderCompleted ? (<CheckCircleIcon ></CheckCircleIcon>) : (<UnpublishedIcon></UnpublishedIcon>)}</TableCell>
                                    <TableCell align="center">
                                        <ConfirmDialog icon={<ReorderIcon></ReorderIcon>} DialogTitle="Sipariş Detayı" DialogContent={<OrderDetailPage rowOrderBasketId={row.orderBasketId} rowOrderCode={row.orderCode}></OrderDetailPage>}
                                            Button1=
                                            {
                                                row.orderCompleted ? null : (
                                                    <ConfirmDialog DialogTitle="Sipariş Detayı" DialogContent="Siparişi Tamamlamak istiyormusunuz" Button1="Evet" Button2="Hayır" apifunction={() => {
                                                        console.log(row.orderBasketId)
                                                        api("POST", "localhost", "7098", "orders", "CompleteOrder", row.orderBasketId, null).then(res => console.log(res));
                                                    }}>

                                                    </ConfirmDialog>
                                                )
                                            }
                                            Button2="Kapat"
                                        ></ConfirmDialog>
                                    </TableCell>

                                    <TableCell align="center">
                                        <IconButton aria-label="delete">
                                            <ConfirmDialog icon={<DeleteIcon></DeleteIcon>} DialogTitle="Dikkat" DialogContent="Urunu Silmek Istiyormusunuz?" Button1="Evet" Button2="Hayır"></ConfirmDialog>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )))



                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div >) : (null)


    );

}
