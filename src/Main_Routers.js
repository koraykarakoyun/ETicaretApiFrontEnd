import React from 'react'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Navbar from './Navbar';
import MainPage from './Pages/Main/MainPage';
import ProductsPage from './Pages/Products/ProductsPage';
import { List } from '@mui/material';
import ProductAdd from './Pages/Products/ProductAddPage';
import ProductUpdate from './Pages/Products/ProductUpdatePage';
import ProductDelete from './Pages/Products/ProductDeletePage';


const Main_Routers = (props) => {
    return (
        <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<MainPage></MainPage>} />
                <Route path="/products" element={<ProductsPage ></ProductsPage>} />
                <Route path="/addproduct" element={<ProductAdd ></ProductAdd>} />
                <Route path="/updateproduct" element={<ProductUpdate ></ProductUpdate>} />
                <Route path="/updateproduct/:id" element={<ProductUpdate ></ProductUpdate>} />
                <Route path="/deleteproduct" element={<ProductDelete ></ProductDelete>} />
                <Route path="/deleteproduct/:id" element={<ProductDelete></ProductDelete>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Main_Routers