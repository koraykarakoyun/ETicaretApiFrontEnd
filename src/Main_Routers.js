import React from 'react'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Navbar from './Navbar';
import MainPage from './Pages/MainPage';
import ProductsPage from './Pages//ProductsPage';
import { List } from '@mui/material';
import ProductAdd from './Pages/ProductAdd';



const api = (method_type = null, origin = "localhost", port = "7098", controller, action, id = null, formData = null) => {

    if (method_type == "GET") {
        if (id == null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                headers: new Headers({ 'content-type': 'application/json' }),
                method: method_type,
            })
                .then(response => response.json())
        }

        if (id != null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, {
                headers: new Headers({ 'content-type': 'application/json' }),
                method: method_type,
            })
                .then(response => response.json())
        }

    }

    if (method_type == "POST") {
        if (id == null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                headers: new Headers({ 'content-type': 'application/json' }),
                method: method_type,
                body: JSON.stringify(formData)
            })
        }

    }

    if (method_type == "PUT") {
        if (id != null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, {
                headers: new Headers({ 'content-type': 'application/json' }),
                method: method_type,
                body: JSON.stringify(formData)
            })
        }

    }

    if (method_type == "DELETE") {
        if (id == null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                headers: new Headers({ 'content-type': 'application/json' }),
                method: method_type,
                
            })
        }

        if (id != null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, {
                headers: new Headers({ 'content-type': 'application/json' }),
                method: method_type,
            });
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
                <Route path="/productadd" element={<ProductAdd api={api}></ProductAdd>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Main_Routers