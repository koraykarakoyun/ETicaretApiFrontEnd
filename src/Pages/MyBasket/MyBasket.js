import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../../Utilities/Api';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
import ConfirmDialog from '../../Components/ConfirmDialog/ConfirmDialog';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function MyBasket() {
    const [datas, setDatas] = useState([]);
    const [IsConfirm, setIsConfirm] = useState(false);



    useEffect(() => {
        api("GET", "localhost", "7098", "baskets", "getbasketitem", null, null).then((data) => {

            setDatas(data);
        });

        api("GET", "localhost", "7098", "orders", "getallorder", null, null).then((data) => {

           console.log(data);
        });

    }, MyBasket)

    return (
        <>
            <TableContainer style={{ margin: "auto", width: "50%", marginLeft: "25%" }} component={Paper}>
                <Table  >
                    <TableHead>
                        <TableRow>
                            <TableCell>ProductName</TableCell>
                            <TableCell>Product Price</TableCell>
                            <TableCell>Product Quantity</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datas.map((data) => (
                            <TableRow
                                key={data.basketItemId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell >{data.productName}</TableCell>
                                <TableCell >{data.productPrice}</TableCell>
                                <TableCell >

                                    <button id={data.basketItemId} onClick={(event) => {

                                        let sayi = Number(document.getElementById(`input_` + event.target.id).value)

                                        if (sayi > 1) {
                                            let input_deger = sayi + -1;
                                            document.getElementById(`input_` + event.target.id).value = input_deger;
                                            var data = {
                                                basketItemId: event.target.id,
                                                quantity: Number(input_deger)
                                            }

                                            api("PUT", "localhost", "7098", "baskets", "updatebasketitem", null, data).then(res => console.log(res));

                                        }

                                        if (sayi == 1) {
                                            var data = {
                                                basketItemId: event.target.id,
                                            }
                                            api("DELETE", "localhost", "7098", "baskets", "deletebasketitem", null, data).then(res => console.log(res));
                                        }


                                    }} >
                                        -
                                    </button>

                                    <input style={{ width: "10%", marginLeft: "3%", marginRight: "3%" }} disabled id={`input_` + data.basketItemId}
                                        defaultValue={data.quantity}></input>
                                    <button id={data.basketItemId} onClick={(event) => {

                                        let sayi = Number(document.getElementById(`input_` + event.target.id).value)

                                        let input_deger = sayi + 1;
                                        document.getElementById(`input_` + event.target.id).value = input_deger;
                                        var data = {
                                            basketItemId: event.target.id,
                                            quantity: Number(input_deger)
                                        }

                                        api("PUT", "localhost", "7098", "baskets", "updatebasketitem", null, data).then(res => console.log(res));

                                    }}>
                                        +
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div style={{ textAlign: "center" }}>
                    <ConfirmDialog icon={<AddBoxIcon></AddBoxIcon>} buttonName="Sepeti Olustur" DialogTitle="Dikkat" DialogContent="Sepetinizi onaylamak istiyormusunuz" apifunction={() => {
                        let formdata = {
                            "address": "istanbul",
                            "Description": "siparis aciklamasi"
                        }
                        api("POST", "localhost", "7098", "orders", "createorder", null, formdata).then(res => console.log(res));
                    }}></ConfirmDialog>
                </div>
            </TableContainer >




        </>
    );
}
