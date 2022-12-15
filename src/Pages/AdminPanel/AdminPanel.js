import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { useState } from 'react';
import ProductsPage from '../Products/ProductsPage';
import ProductAdd from '../Products/ProductAddPage';
import { useEffect } from 'react';
import OrdersPage from '../Orders/OrdersPage';
import AuthPage from '../AuthorizationMenu/AuthorizationPage';
import RolesPage from '../Roles/RolesPage';
import UsersPage from '../Users/UsersPage';
import registerloginimage from "../../Image/register-login.jpg"

let backgroundImageDiv = {
    "height": "100%",
    "min-height": "54rem",
    "background-repeat": "no-repeat",
    "background-position": "center",
    "background-size": "cover",
    "background-image": `url(${registerloginimage})`,
}


export default function AdminPanel(props) {
    const [table, setTable] = useState(null);
    useEffect(() => {
        if (props.type === "products") {
            setTable(<ProductsPage></ProductsPage>)

        }
        else if (props.type === "orders") {
            setTable(<OrdersPage></OrdersPage>)


        }
        else if (props.type === "users") {
            setTable(<UsersPage></UsersPage>)

        }

        else if (props.type === "roles") {
            setTable(<RolesPage></RolesPage>)

        }
        else if (props.type === "auth") {
            setTable(<AuthPage></AuthPage>)

        }
    }, [props.type])

    return (
        <div style={backgroundImageDiv}>
            <div class="container">
                {table}
            </div>
        </div>
    );
}
