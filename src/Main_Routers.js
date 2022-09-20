import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './Navbar';
import MainPage from './Pages/Main/MainPage';
import ProductsPage from './Pages/Products/ProductsPage';
import { List } from '@mui/material';
import ProductAdd from './Pages/Products/ProductAddPage';
import ProductUpdate from './Pages/Products/ProductUpdatePage';
import ProductDelete from './Pages/Products/ProductDeletePage';
import RegistrationForm from './Pages/Register/RegisterForm';
import LoginForm from './Pages/LogIn/LoginForm';
import NotFound from './Pages/NotFound/NotFound';



const Main_Routers = (props) => {


    const [Isauthenticated, setIsauthenticated] = useState(false);

    let routes = (
        <></>
    );
    if (!Isauthenticated) {
        routes = (<Routes>
            <Route path="*" element={<LoginForm setIsauthenticated={setIsauthenticated}/>} />
            <Route path="/" element={<MainPage setIsauthenticated={setIsauthenticated}></MainPage>} />
            <Route path="/register" element={<RegistrationForm></RegistrationForm>} />
            <Route path="/login" element={<LoginForm setIsauthenticated={setIsauthenticated}></LoginForm>} />
        </Routes>)
    }
    if (Isauthenticated) {
        routes = (
            <Routes>
                <Route path="*" element={<NotFound></NotFound>} />
                <Route path="/" element={<MainPage></MainPage>} />
                <Route path="/products" element={<ProductsPage></ProductsPage>} />
                <Route path="/addproduct" element={<ProductAdd ></ProductAdd>} />
                <Route path="/updateproduct" element={<ProductUpdate ></ProductUpdate>} />
                <Route path="/updateproduct/:id" element={<ProductUpdate ></ProductUpdate>} />
                <Route path="/deleteproduct" element={<ProductDelete ></ProductDelete>} />
                <Route path="/deleteproduct/:id" element={<ProductDelete></ProductDelete>} />
            </Routes>
        )
    }

    return (
        <BrowserRouter>
            <Navbar></Navbar>
            {routes}
        </BrowserRouter>
    )
}

export default Main_Routers