import React from 'react'
import { bindActionCreators } from 'redux';
import { activatedbasket, deactivatedbasket } from '../../Redux/Action/ActiveBasket';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { api } from '../../Utilities/Api';
import { useState } from 'react';
import OrderDetail from '../../Components/OrderDetail/OrderDetail';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import CreditCard from '../../Components/CreditCard/CreditCard';
import ConfirmDialog from '../../Components/ConfirmDialog/ConfirmDialog';

const OrdersCheckout = (props) => {
    const [datas, setDatas] = useState({ success: false, data: [] });
    const [verifycode, setVerifyCode] = useState("");
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
    }, [])




    return (
        <>

            <Box style={{ marginLeft: "15%", marginTop: "2%", marginRight: "15%" }} sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <CreditCard></CreditCard>
                        <h5>Diğer Bilgiler</h5>
                        <Grid spacing={2} container>
                            <Grid xs={6} item >
                                <TextField multiline={true} rows={5} style={{ width: "100%" }} id="address" label="Adres" variant="outlined" />
                            </Grid>
                            <Grid xs={6} item >
                                <TextField multiline={true} rows={5} style={{ width: "100%" }} id="description" label="Açıklama" variant="outlined" />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>

                        <OrderDetail></OrderDetail>
                        <hr style={hrStyle}></hr>

                        <ConfirmDialog buttonName="Siparişi Tamamla" DialogTitle="Ödeme Sayfası"
                            DialogContent={
                                <>
                                    <div>xxx Telefonuna Mesaj Göndeilmiştir.Lütfen Gelen Kodu Giriniz.</div>
                                    <TextField style={{ width: "100%" }} id="verifycode" label="Code" variant="outlined" onChange={() => { setVerifyCode(document.getElementById("verifycode").value) }} />
                                </>
                            }
                            apifunction={() => {
                                if (verifycode == "123456") {
                                    
                                    let data={
                                        "Description":document.getElementById("description").value,
                                        "Address":document.getElementById("address").value
                                    }

                                    api("POST", "localhost", "7098", "orders", "CreateOrder", null, data).then((data) => {
                                        console.log(data);
                                    });
                                }
                            }}
                            Button1="Onayla"
                            Button2="İptal Et">
                        </ConfirmDialog>


                    </Grid>

                </Grid>
            </Box>



        </>
    )
}


const mapStateToProps = (state) => {
    return {
        activebasketState: state.activeBasket,
    }
}

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ activatedbasket, deactivatedbasket }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersCheckout)