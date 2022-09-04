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


export default function ProductsPage(props) {

  const [deger, setDeger] = useState([]);


  useEffect(() => {

    props.api("GET", "localhost", "7098", "products", "getall").then((data) => {
      setDeger(data);
    });


  }, [])

  return (
    <div style={{ marginLeft: "64px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ProductId</TableCell>
              <TableCell align="left">ProductName</TableCell>
              <TableCell align="left">ProductStock</TableCell>
              <TableCell align="left">ProductPrice</TableCell>
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
                  <IconButton aria-label="delete">
                    <DeleteIcon onClick={() => {
                      console.log(row.id);
                      props.api("DELETE","localhost", "7098", "products", "deletebyid", row.id);
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
