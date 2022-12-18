import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from './Pages/Products/ProductsPage';
import ProductAdd from './Pages/Products/ProductAddPage';
import ProductUpdate from './Pages/Products/ProductUpdatePage';
import ProductDelete from './Pages/Products/ProductDeletePage';
import RegistrationForm from './Pages/Register/RegisterForm';
import LoginForm from './Pages/LogIn/LoginForm';
import NotFound from './Pages/NotFound/NotFound';
import { connect } from 'react-redux';
import { authanticated, notauthanticated } from './Redux/Action/AuthAction';
import { bindActionCreators } from 'redux';
import AdminPanel from './Pages/AdminPanel/AdminPanel';
import FileUploadModelDialog from './Components/FileUploadModelDialog';
import MainPage from "./Pagination/MainPage";
import MyBasket from './Pages/MyBasket/MyBasket';
import Navbar2 from './Components/Navbar/Navbar2';
import { useEffect } from 'react';
import { api } from './Utilities/Api';


const Main_Routers = (props) => {

    let routes = (
        <>

        </>
    );
    if (!props.authstate.isAuth) {
        routes = (
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<MainPage></MainPage>} />
                <Route path="/register" element={<RegistrationForm ></RegistrationForm>} />
                <Route path="/login" element={<LoginForm></LoginForm>} />
                <Route path="/:category" element={<MainPage></MainPage>} />
            </Routes>
        )
    }
    if (props.authstate.isAuth) {
        routes = (
            <Routes>
                <Route path="*" element={<MainPage></MainPage>} />
                <Route path="/adminpanel" element={<AdminPanel type="products"></AdminPanel>} />

                <Route path="/adminpanel/products" element={<AdminPanel type="products"></AdminPanel>} />
                <Route path="/adminpanel/orders" element={<AdminPanel type="orders"></AdminPanel>} />
                <Route path="/adminpanel/users" element={<AdminPanel type="users"></AdminPanel>} />
                <Route path="/adminpanel/roles" element={<AdminPanel type="roles"></AdminPanel>} />
                <Route path="/adminpanel/auth" element={<AdminPanel type="auth"></AdminPanel>} />
                {/* Admin Panel */}
                <Route path="/addproduct" element={<ProductAdd ></ProductAdd>} />
                <Route path="/updateproduct" element={<ProductUpdate ></ProductUpdate>} />
                <Route path="/updateproduct/:id" element={<ProductUpdate ></ProductUpdate>} />
                <Route path="/deleteproduct" element={<ProductDelete ></ProductDelete>} />
                <Route path="/deleteproduct/:id" element={<ProductDelete></ProductDelete>} />
                <Route path="/fileupload/:id" element={<FileUploadModelDialog></FileUploadModelDialog>} />
                <Route path="/mybasket" element={<MyBasket></MyBasket>} />
                {/* Admin Panel */}
                <Route path="/:category" element={<MainPage></MainPage>} />


            </Routes>
        )
    }



    return (
        < BrowserRouter >
            <Navbar2></Navbar2>
            <>

                {routes}

            </>
        </BrowserRouter >
    )
}


const mapStateToProps = (state) => {
    return {
        authstate: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ authanticated, notauthanticated }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main_Routers)