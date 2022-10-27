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
            <div>
                {"Sipariş Numarası: " + props.rowOrderBasketId}
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>TotalPrice</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basketItems.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.price}</TableCell>
                                <TableCell align="left">{row.quantity}</TableCell>
                                <TableCell align="left">{row.totalPrice}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ textAlign: "right" }}>
                <div>
                    Toplam Fiyat: {totalPrice + " TL"}
                </div>
                <div>
                    Adres: {data.address}
                </div>
                <div>
                    Açıklama: {data.description}
                </div>
            </div>
        </>
    );
}
