import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { api } from '../../Utilities/Api';
import { useState } from 'react';


export default function OrderDetailPage(props) {


    const [data, setData] = useState([], []);
    const [basketItems, setbasketItems] = useState([]);
    let totalPrice = 0;

    useEffect(() => {
        api("GET", "localhost", "7098", "orders", "getorderdetailbyid", props.rowOrderBasketId, null).then(res => {
            setData(res)
            setbasketItems(res.basketItems)
        })
    }, []);


    basketItems.forEach(element => {
        totalPrice += element.totalPrice
    });


    return (
        <>
            <div style={{ marginBottom: "3%" }}>
                <span style={{ fontSize: "1.1rem" }}> Sipariş Numarası:</span>
                <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}> {props.rowOrderCode}</span>

            </div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Ürün İsmi</TableCell>
                            <TableCell align="center">Ürün Adedi</TableCell>
                            <TableCell align="center">Birim Fiyatı</TableCell>
                            <TableCell align="center">Toplam Fiyatı</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basketItems.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.quantity}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.totalPrice}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ textAlign: "right", marginTop: "3%" }}>
                <div style={{ marginTop: "3%", wordWrap: "break-word", wordBreak: "break-all" }}>
                    <span style={{ fontSize: "1.1rem" }}> Toplam Fiyat: </span>
                    {totalPrice + " TL"}
                </div>
                <div style={{ marginTop: "3%", wordWrap: "break-word", wordBreak: "break-all" }}>
                    <span style={{ fontSize: "1.1rem" }}> Adres: </span>
                    {data.address}
                </div>
                <div style={{ marginTop: "3%", wordWrap: "break-word", wordBreak: "break-all" }}>
                    <span style={{ fontSize: "1.1rem" }}>  Açıklama:  </span>
                    {data.description}
                </div>
            </div>
        </>
    );
}
