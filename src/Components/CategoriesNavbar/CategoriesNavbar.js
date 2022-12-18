import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect } from 'react';
import { api } from '../../Utilities/Api';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';


export default function CategoriesNavbar(props) {


    const [categories, setcategories] = useState([]);

    useEffect(() => {
        api("GET", "localhost", "7098", "categories", "GetAllCategories", null, null).then((data) => {
            setcategories(data);
        });
    }, [])

    return (

        <AppBar style={{ backgroundColor: "#193441" }} position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 6 }}></Box >
                {
                    categories.map((element) => {
                        return (
                            <Box sx={{ flexGrow: 1 }}>
                                <Button >
                                    <Link style={{ color: 'white', fontSize: "0.9rem", textDecoration: "none" }} to={"/" + element.name.toLowerCase()}>
                                        {element.name}
                                    </Link>
                                </Button>
                            </Box >
                        )
                    })
                }

                <Box sx={{ flexGrow: 6 }}></Box >
            </Toolbar>
        </AppBar >

    );
}
