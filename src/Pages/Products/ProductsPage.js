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

export default function ProductsPage(props) {
  let token = localStorage.getItem("token");
  const [deger, setDeger] = useState([]);
  useEffect(() => {
    api("GET", "localhost", "7098", "products", "getall", null, null, token).then((data) => {
     //localStorage.setItem("token",data.token.accessToken);
      //localStorage.setItem("refreshtoken",data.token.refreshToken);
      console.log(data)
      setDeger(data);
    });
  }, ProductsPage)

  return (
    <div style={{ marginLeft: "64px" }}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {deger.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.stock}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">
                  <Link to={`/addproduct`}><AddIcon></AddIcon></Link>
                </TableCell>
                <TableCell align="left">
                  <Link to={`/updateproduct/${row.id}`}><AutorenewIcon /></Link>
                </TableCell>
                <TableCell align="left">
                  <IconButton aria-label="delete">
                    <DeleteIcon onClick={() => {
                      let data = {
                        id: String(row.id)
                      }
                      api("DELETE", "localhost", "7098", "products", "deletebyid", row.id, data, token).then(response => {
                        notify(response.message);
                      })
                    }} />
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
