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
import { Link, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../Utilities/Api';
import { notify } from '../../Utilities/Notify';
import AddIcon from '@mui/icons-material/Add';

import FileUploadModelDialog from '../../Components/FileUploadModelDialog';
import ConfirmDialog from '../../Components/ConfirmDialog/ConfirmDialog';

export default function OrdersPage(props) {
    let token = localStorage.getItem("token");
    const [deger, setDeger] = useState([]);


    useEffect(() => {
        api("GET", "localhost", "7098", "orders", "getallorders", null, null, token).then((data) => {
            console.log(data)
            setDeger(data);
        });
    }, OrdersPage)
    return (
        <div style={{ marginLeft: "64px" }}>
            <ToastContainer />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">OrderCode</TableCell>
                            <TableCell align="left">UserName</TableCell>
                            <TableCell align="left">TotalPrice</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left">CreatedDate</TableCell>
                            <TableCell align="left">Add</TableCell>
                            <TableCell align="left">Update</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deger.map((row) => (
                            <TableRow key={row.orderBasketId}>
                                <TableCell align="left">{row.orderCode}</TableCell>
                                <TableCell align="left">{row.userName}</TableCell>
                                <TableCell align="left">{row.totalPrice}</TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="left">{row.address}</TableCell>
                                <TableCell align="left">{row.createdDate}</TableCell>
                                <TableCell align="left">
                                    <Link to={`/addproduct`}><AddIcon></AddIcon></Link>
                                </TableCell>
                                <TableCell align="left">
                                    <Link to={`/updateproduct/${row.id}`}><AutorenewIcon /></Link>
                                </TableCell>
                                <TableCell align="left">
                                    <IconButton aria-label="delete">

                                        <ConfirmDialog icon={<DeleteIcon></DeleteIcon>} DialogTitle="Dikkat" DialogContent="Urunu Silmek Istiyormusunuz?" apifunction={() => {
                                            let data = {
                                                id: String(row.id)
                                            }
                                            api("DELETE", "localhost", "7098", "products", "deletebyid", row.id, data, token).then(response => {
                                                notify(response.message);
                                            })
                                        }} ></ConfirmDialog>

                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}
