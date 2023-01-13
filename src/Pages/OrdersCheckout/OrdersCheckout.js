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
import { useAlert } from 'react-alert'
import { types } from 'react-alert'
import { useNavigate } from "react-router-dom";
const OrdersCheckout = (props) => {
    const navigate = useNavigate();
    const alert = useAlert()
    const [datas, setDatas] = useState({ success: false, data: [] });
    const [userInfo, setUserInfo] = useState({ name: "", surname: "", phoneNumber: "" });
    const [verifycode, setVerifyCode] = useState("");
    const [cardinfos, setCardinfos] = useState(false);
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

        api("GET", "localhost", "7098", "users", "getuserinfo", null, null).then((data) => {

            setUserInfo(data);
            console.log(userInfo)
        });


    }, [])




    return (
        <>

            <Box style={{ marginLeft: "15%", marginTop: "2%", marginRight: "15%" }} sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <CreditCard setCardinfos={setCardinfos}></CreditCard>
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
                        {
                            cardinfos ? (<ConfirmDialog buttonName="Siparişi Tamamla" DialogTitle="Ödeme Sayfası"
                                DialogContent={
                                    <>
                                        <div>{userInfo.phoneNumber} Telefonuna Güvenlik Kodu Gönderilmiştir.Lütfen 6 Haneli Kodu Giriniz.</div>
                                        <TextField style={{ width: "100%", marginTop: "2%" }} inputProps={{ maxLength: 6 }} id="verifycode" label="Doğrulama Kodu" variant="outlined" onChange={() => { setVerifyCode(document.getElementById("verifycode").value) }} />
                                    </>
                                }
                                apifunction={() => {
                                    if (verifycode == "123456") {

                                        let data = {
                                            "Description": document.getElementById("description").value,
                                            "Address": document.getElementById("address").value
                                        }

                                        api("POST", "localhost", "7098", "orders", "CreateOrder", null, data).then((data) => {
                                            if (data.isSuccess) {
                                                alert.show(data.message, { type: types.SUCCESS })
                                                navigate("/");

                                            }
                                            else {
                                                alert.show(data.message, { type: types.ERROR })
                                            }

                                        });
                                    }
                                    else {
                                        alert.show("Lütfen Doğrulama Kodunu Kontrol Ediniz", { type: types.ERROR })
                                    }
                                }}
                                Button1="Onayla"
                                Button2="İptal Et">
                            </ConfirmDialog>) : (<Button variant='contained' onClick={() => { alert.show("Lütfen Kart Bilgilerini Kontrol Ediniz", { type: types.ERROR }) }}>Siparişi Tamamla</Button>)

                        }





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