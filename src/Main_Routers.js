import React from 'react'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Navbar from './Navbar';
import MainPage from './Pages/MainPage';
import ProductsPage from "./Pages/ProductsPage"
import { List } from '@mui/material';


const api = (method_type = null, origin = "localhost", port = "7098", controller, action, id = null) => {

    if (method_type == "GET") {
        if (id == null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}`, { method: method_type })
                .then(response => response.json())
        }

        if (id != null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, { method: method_type })
                .then(response => response.json())
        }

    }

    if (method_type == "POST") {
        if (id == null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}`, { method: method_type })
                .then(response => response.json())
        }

    }

    if (method_type == "PUT") {
        if (id != null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, { method: method_type })
                .then(response => response.json())
        }

    }

    if (method_type == "DELETE") {
        if (id == null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}`, { method: method_type })
                .then(response => response.json())
        }

        if (id != null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, { method: method_type })
                .then(response => response.json())
        }

    }



}


const Main_Routers = () => {
    return (
        <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<MainPage></MainPage>} />
                <Route path="/products" element={<ProductsPage api={api}></ProductsPage>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Main_Routers