import { List } from '@mui/material';
import React from 'react'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import BasicTable from "./BasicTable"
import Navbar from './Navbar';
import axios from 'axios';


const api = (method_type = null,origin="localhost", port="7098", controller, action, id = null) => {

    if (method_type == "GET") {
        if (id == null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}`, { method:method_type })
                .then(response => response.json())
        }

        if(id != null){
            return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, { method:method_type })
            .then(response => response.json())
        }
        
    }

    if (method_type == "POST") {
        if (id == null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}`, { method:method_type })
                .then(response => response.json())
        }
 
    }

    if (method_type == "PUT") {
        if (id != null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, { method:method_type })
                .then(response => response.json())
        }
 
    }

    if (method_type == "DELETE") {
        if (id == null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}`, { method:method_type })
                .then(response => response.json())
        }

        if(id != null){
            return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, { method:method_type })
            .then(response => response.json())
        }
        
    }



}



const Main = () => {
    return (

        <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route path="/listele" element={<BasicTable api={api}></BasicTable>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Main