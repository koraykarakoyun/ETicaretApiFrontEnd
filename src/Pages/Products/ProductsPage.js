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
import { useAlert } from 'react-alert'
import { types } from 'react-alert'
const divMargin = {
  marginLeft: "5%",
  marginRight: "5%"
}
export default function ProductsPage(props) {
  const alert = useAlert()
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell align="center">Ürün İsmi</TableCell>
              <TableCell align="center">Ürün Stoğu</TableCell>
              <TableCell align="center">Ürün Fiyatı</TableCell>
              <TableCell align="center">Ekle</TableCell>
              <TableCell align="center">Güncelle</TableCell>
              <TableCell align="center">Sil</TableCell>
              <TableCell align="center">Resim</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deger.data.map((row) => (
              <TableRow key={row.productId}>
                <TableCell align="center">{row.productName}</TableCell>
                <TableCell align="center">{row.productStock}</TableCell>
                <TableCell align="center">{row.productPrice}</TableCell>
                <TableCell align="center">
                  <ProductAdd productid={row.productId}></ProductAdd>
                </TableCell>
                <TableCell align="center">
                  <ProductUpdate productid={row.productId}></ProductUpdate>
                </TableCell>
                <TableCell align="center">
                  <IconButton aria-label="delete">
                    <ConfirmDialog icon={<DeleteIcon></DeleteIcon>} DialogTitle="Dikkat" DialogContent="Urunu Silmek Istiyormusunuz?" Button1="Evet" Button2="Hayır" apifunction={() => {
                      api("DELETE", "localhost", "7098", "products", "deletebyid", row.productId, null).then(response => {
                        if (response.isSuccess) {
                          alert.show(response.message, { type: types.SUCCESS })
                        }
                        else{
                          alert.show(response.message, { type: types.ERROR })
                        }
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
