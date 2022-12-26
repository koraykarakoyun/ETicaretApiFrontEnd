import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider'
import { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../../Utilities/Api';
import CardMedia from '@mui/material/CardMedia';

export default function MyBasket2() {
    const [datas, setDatas] = useState({ success: false, data: [] });
    const [IsConfirm, setIsConfirm] = useState(false);


    const divMargin = {
        marginLeft: "20%",
        marginRight: "20%",
        marginTop: "1%"
    }

    useEffect(() => {


        api("GET", "localhost", "7098", "baskets", "getbasketitem", null, null).then((data) => {
            console.log(data);
            if (data.status == 401) {
                setDatas({ success: false, data: [] })
            }
            else {
                setDatas({ success: true, data: data })
            }

        });

    }, MyBasket2)

    return (
        datas.success ? (
            <div style={divMargin}>

                {datas.data.map((data) => (
                    <>
                        <div style={{
                            border: "1px solid black", margin: "5px"
                            , height: "10%"
                        }}>

                            <CardMedia
                                component="img"
                                src={
                                    `http://127.0.0.1:8887/${data.productPath}`
                                }
                                style={{ width: "30%", objectFit: "fill", display: "inline-block" }}
                            />
                            <div style={{ display: "inline-block" ,position:"absolute", left:"40%" }} >
                                {data.productName}
                            </div>
                            <div style={{ display: "inline-block" ,position:"relative", bottom:"1rem",left:"1rem"}} >
                                {data.productBrand}
                            </div>


                            <Divider variant="inset" />
                        </div>
                    </>
                ))}




            </div>
        ) : (null)
    );
}
