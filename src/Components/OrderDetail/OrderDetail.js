import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { api } from '../../Utilities/Api';

const OrderDetail = () => {

    const [datas, setDatas] = useState({ success: false, data: [] });
    const hrStyle = {
        margin: "2%",
        padding: 0
    }
    let sumPrice = 0;
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

        datas.success ? (
            <>
                <div style={{ minHeight: "2rem"}}>
                    <div style={{ float: "left", fontSize: "1.2rem", fontWeight: "bold" }}>SİPARİŞ ÖZETİ</div>
                    <div style={{ float: "right", marginTop: "1%" }}>{datas.data[0].count + " ÜRÜN"}</div>
                </div>
                <hr style={hrStyle}></hr>
                <div style={{ minHeight: "2rem" }}>
                    {
                        datas.data.forEach(element => {
                            sumPrice = sumPrice + (element.productQuantity * element.productPrice)
                        })
                    }
                    <div>
                        <div style={{ float: "left" }}>
                            Ürünlerin Toplamı ({datas.data[0].count + " Ürün"})
                        </div>
                        <div style={{ float: "right" }}>
                            {sumPrice + " TL"}
                        </div>
                    </div>
                </div>
                <hr style={hrStyle}></hr>
                <div style={{ minHeight: "2rem" }} >

                    <div>
                        <div style={{ float: "left", fontSize: "1.4rem", fontWeight: "bold" }}>
                            Toplam Fiyat
                        </div>
                        <div style={{ float: "right", fontSize: "1.4rem", }}>
                            {sumPrice + " TL"}
                        </div>
                    </div>

                </div>

            </>) : (null)
    )
}

export default OrderDetail