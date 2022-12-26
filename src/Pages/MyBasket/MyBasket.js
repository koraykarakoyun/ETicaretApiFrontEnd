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
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
export default function MyBasket() {
    const [datas, setDatas] = useState({ success: false, data: [] });
    const [IsConfirm, setIsConfirm] = useState(false);




    useEffect(() => {


        api("GET", "localhost", "7098", "baskets", "getbasketitem", null, null).then((data) => {

            console.log(data);
            if (data.status == 401) {
                setDatas({ success: false, data: [] })
            }
            else {
                setDatas({ success: true, data: data, })
            }

        });



    }, MyBasket)

    return (
        datas.success ? (

            datas.data[0].count == 0 ? (<div>
               Boş Sepet
            </div>
            ) : (<>
                <div style={{ margin: "auto", marginLeft: "15%", marginTop: "2%", marginBottom: "0", fontSize: "1.8rem" }}>
                    Sepetim
                </div>

                <Box style={{ marginLeft: "15%", marginTop: "2%", marginRight: "15%" }} sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>


                        <Grid item xs={9}>
                            <TableContainer component={Paper}>

                                <Table  >
                                    <TableHead>
                                        <TableRow>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {datas.data.map((data) => (
                                            <TableRow
                                                key={data.basketItemId}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell >
                                                    <CardMedia
                                                        component="img"
                                                        src={
                                                            `http://127.0.0.1:8887/${data.productPath}`
                                                        }
                                                        style={{ height: "7rem", objectFit: "fill", }}
                                                    />
                                                </TableCell>

                                                <TableCell >
                                                    {data.productName}
                                                    <br></br><br></br>

                                                    {data.productModel} / {data.productColor}

                                                    <br></br><br></br>
                                                    {data.productPrice + " TL"}

                                                </TableCell>

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
                                                        defaultValue={data.productQuantity}></input>
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

                            </TableContainer >
                        </Grid>

                        <Grid item xs={3}>
                            <div>
                                <TextField multiline={true} rows={5} style={{ width: "100%" }} id="address" label="Adres" variant="outlined" />
                                <br></br><br></br>
                                <TextField multiline={true} rows={5} style={{ width: "100%" }} id="description" label="Açıklama" variant="outlined" />
                                <br></br><br></br>
                                <ConfirmDialog buttonName={"Sepeti Tamamla"} Button1="Onayla" Button2="İptal Et" DialogTitle="Dikkat" DialogContent="Sepetinizi onaylamak istiyormusunuz" apifunction={() => {
                                    let formdata = {
                                        "address": document.getElementById("address").value,
                                        "description": document.getElementById("description").value
                                    }

                                    api("POST", "localhost", "7098", "orders", "createorder", null, formdata).then(res => console.log(res));
                                }}></ConfirmDialog>

                            </div>
                        </Grid>

                    </Grid>
                </Box>


            </>)

        ) : (null)
    );
}
