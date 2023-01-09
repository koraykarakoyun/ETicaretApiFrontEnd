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
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import MainPage from '../../Pagination/MainPage';
import { bindActionCreators } from 'redux';
import { activatedbasket, deactivatedbasket } from '../../Redux/Action/ActiveBasket';
import { connect } from 'react-redux';
import OrderDetail from '../../Components/OrderDetail/OrderDetail';
function MyBasket(props) {
    const [datas, setDatas] = useState({ success: false, data: [] });
    const hrStyle = {
        margin: "2%",
        padding: 0
    }
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

            datas.data[0].count == 0 ? (
                <>

                    <div style={{ marginLeft: "auto", marginRight: "auto", marginTop: "4%", width: "50%", textAlign: "center", fontSize: "1.8rem" }}>
                        Sepetiniz boş!
                    </div>

                    <div style={{ marginLeft: "auto", marginRight: "auto", marginTop: "4%", width: "50%", textAlign: "center" }} >
                        <ShoppingBagIcon style={{ fontSize: "10rem" ,color:"#193441" }} ></ShoppingBagIcon>
                    </div>

                    <div style={{ marginLeft: "auto", marginRight: "auto", marginTop: "4%", width: "50%", textAlign: "center" }} >
                        <Link style={{ textDecoration: "none" }} to="/">
                            <Button style={{ backgroundColor: "#193441", borderRadius: "0", fontSize: "1.2rem" }} variant="contained"> Alışverişe Başlayın!</Button>
                        </Link>



                    </div>

                </>
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

                                            < TableRow
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
                            <OrderDetail></OrderDetail>

                            <hr style={hrStyle}></hr>
                            
                            <Link to="/orders/checkout">
                                <Button onClick={() => {
                                    props.activatedbasket();
                                }} variant="contained" style={{ width: "100%" }}>
                                    Ödeme Sayfasına Devam Et
                                </Button>
                            </Link>

                        </Grid>

                    </Grid>
                </Box>


            </>)

        ) : (null)
    );
}


const mapStateToProps = (state) => {
    return {
        activebasketState: state.activeBasket,
    }
}

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ activatedbasket, deactivatedbasket }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBasket)
