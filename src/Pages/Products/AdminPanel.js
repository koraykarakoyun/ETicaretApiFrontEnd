import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { useState } from 'react';
import ProductsPage from './ProductsPage';
import ProductAdd from './ProductAddPage';
import { useEffect } from 'react';
import ProductDelete from './ProductDeletePage';
import ProductUpdate from './ProductUpdatePage';



let buttonStyle = {
    "width": "100%"
}

export default function AdminPanel() {


    const [table, setTable] = useState(<ProductsPage></ProductsPage>);
    return (
        <div class="container" style={{ border: "1px solid black", marginTop: "1%" }}>
            <div class="row">
                <div class="col-2">
                    <button style={buttonStyle} onClick={() => {
                        setTable(<ProductsPage></ProductsPage>)
                    }}>
                        Products
                    </button>
                    <button style={buttonStyle} onClick={() => {
                        setTable()
                    }}>
                        Suppliers
                    </button>
                    <button style={buttonStyle} onClick={() => {
                        setTable()
                    }} >
                        Categories
                    </button>
                </div>
                <div class="col-10">
                    {table}
                </div>
            </div>
        </div>
    );
}
