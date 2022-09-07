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

export default function ProductsPage(props) {
  const [deger, setDeger] = useState([]);
  useEffect(() => {
    api("GET", "localhost", "7098", "products", "getall").then((data) => {
      setDeger(data);
    });

  }, [])

  return (
    <div style={{ marginLeft: "64px" }}>
      <ToastContainer />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ProductId</TableCell>
              <TableCell align="left">ProductName</TableCell>
              <TableCell align="left">ProductStock</TableCell>
              <TableCell align="left">ProductPrice</TableCell>
              <TableCell align="left">Update</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deger.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.stock}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">
                  <Link to={`/updateproduct/${row.id}`}><AutorenewIcon /></Link>
                </TableCell>
                <TableCell align="left">
                  <IconButton aria-label="delete">
                    <DeleteIcon onClick={() => {
                      api("DELETE", "localhost", "7098", "products", "deletebyid", row.id).then(response => {
                        notify(response);
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
