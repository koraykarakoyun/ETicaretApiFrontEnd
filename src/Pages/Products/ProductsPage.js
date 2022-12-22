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
import ProductAdd from './ProductAddPage';
import ProductUpdate from './ProductUpdatePage';
const divMargin = {
  marginLeft: "5%",
  marginRight: "5%"
}
export default function ProductsPage(props) {
  const [deger, setDeger] = useState({ success: false, data: [] });
  const [addproduct, setAddproduct] = useState({});
  const [updateproduct, setUpdateproduct] = useState({});
  useEffect(() => {
    api("GET", "localhost", "7098", "products", "getall", null, null).then((data) => {
      console.log(data)
      if (data.status == 401) {

        setDeger({ success: false, data: [] })
      }
      else {
        setDeger({ success: true, data: data })
      }

    });
  }, ProductsPage)
  return (

    deger.success ? (<div style={divMargin}>
      <ToastContainer />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ProductName</TableCell>
              <TableCell align="center">ProductStock</TableCell>
              <TableCell align="center">ProductPrice</TableCell>
              <TableCell align="center">Add</TableCell>
              <TableCell align="center">Update</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deger.data.map((row) => (
              <TableRow key={row.productId}>
                <TableCell align="center">{row.productName}</TableCell>
                <TableCell align="center">{row.productStock}</TableCell>
                <TableCell align="center">{row.productPrice}</TableCell>
                <TableCell align="center">
                  <ConfirmDialog icon={<AddIcon></AddIcon>} DialogTitle="Urun Ekle" DialogContent={<ProductAdd productid={row.productId} setAddproduct={setAddproduct}></ProductAdd>}
                    Button1=
                    {
                      <ConfirmDialog DialogTitle="Dikkat" DialogContent="Urunu Eklemek İstediğinize Eminmisinz" Button1="Evet" Button2="Hayır" apifunction={() => {

                        api("POST", "localhost", "7098", "products", "add", null, addproduct).then(res => notify(res.message))
                      }}>
                      </ConfirmDialog>
                    }
                    Button2="Kapat"
                  ></ConfirmDialog>
                </TableCell>
                <TableCell align="center">
                  <ConfirmDialog icon={<AutorenewIcon></AutorenewIcon>} DialogTitle="Urunu Guncelle" DialogContent={<ProductUpdate productid={row.productId} setUpdateproduct={setUpdateproduct}></ProductUpdate>}
                    Button1=
                    {
                      <ConfirmDialog DialogTitle="Dikkat" DialogContent="Urunu Guncellemek İstediğinize Eminmisinz" Button1="Evet" Button2="Hayır" apifunction={() => {

                        api("PUT", "localhost", "7098", "products", "update", null, updateproduct).then(res => notify(res.message))
                      }}>
                      </ConfirmDialog>
                    }
                    Button2="Kapat"
                  ></ConfirmDialog>
                </TableCell>
                <TableCell align="center">
                  <IconButton aria-label="delete">
                    <ConfirmDialog icon={<DeleteIcon></DeleteIcon>} DialogTitle="Dikkat" DialogContent="Urunu Silmek Istiyormusunuz?" Button1="Evet" Button2="Hayır" apifunction={() => {
                      api("DELETE", "localhost", "7098", "products", "deletebyid", row.productId, null).then(response => {
                        notify(response.message);
                      })
                    }} ></ConfirmDialog>

                  </IconButton>
                </TableCell>
                <TableCell align="center">
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
