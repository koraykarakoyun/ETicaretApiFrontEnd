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

export default function ProductsPage(props) {
  const [deger, setDeger] = useState({ success: false, data: [] });


  useEffect(() => {
    api("GET", "localhost", "7098", "products", "getall", null, null).then((data) => {
            if (data.status == 401) {
                setDeger({ success: false, data: [] })
            }
            else{ 
                setDeger({ success: true, data: data })
            }
     
    });
  },ProductsPage)
  return (

    deger.success ? (<div style={{ marginLeft: "64px" }}>
      <ToastContainer />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ProductName</TableCell>
              <TableCell align="left">ProductStock</TableCell>
              <TableCell align="left">ProductPrice</TableCell>
              <TableCell align="left">Add</TableCell>
              <TableCell align="left">Update</TableCell>
              <TableCell align="left">Delete</TableCell>
              <TableCell align="left">Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deger.data.map((row) => (
              <TableRow key={row.productId}>
                <TableCell align="left">{row.productName}</TableCell>
                <TableCell align="left">{row.producStock}</TableCell>
                <TableCell align="left">{row.productPrice}</TableCell>
                <TableCell align="left">
                  <Link to={`/addproduct`}><AddIcon></AddIcon></Link>
                </TableCell>
                <TableCell align="left">
                  <Link to={`/updateproduct/${row.productId}`}><AutorenewIcon /></Link>
                </TableCell>
                <TableCell align="left">
                  <IconButton aria-label="delete">

                    <ConfirmDialog icon={<DeleteIcon></DeleteIcon>} DialogTitle="Dikkat" DialogContent="Urunu Silmek Istiyormusunuz?" apifunction={() => {
                      api("DELETE", "localhost", "7098", "products", "deletebyid", row.productId,null).then(response => {
                        notify(response.message);
                      })
                    }} ></ConfirmDialog>

                  </IconButton>
                </TableCell>
                <TableCell align="left">
                  <FileUploadModelDialog productId={row.productId}></FileUploadModelDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>) : (null)


  );

}
