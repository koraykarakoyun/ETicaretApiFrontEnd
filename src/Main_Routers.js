import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './Navbar';
import MainPage from './Pages/Main/MainPage';
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
import AdminPanel from './Pages/Products/AdminPanel';
import MainPagination from './Pagination/MainPage';


const Main_Routers = (props) => {

    let routes = (
        <></>
    );
    if (!props.authstate) {
        routes = (
            <Routes>
                <Route path="*" element={<NotFound/>} />
                <Route path="/" element={<MainPagination></MainPagination>}/>
                <Route path="/register" element={<RegistrationForm></RegistrationForm>} />
                <Route path="/login" element={<LoginForm></LoginForm>} />
            </Routes>
        )
    }
    if (props.authstate) {
        routes = (
            <Routes>
                <Route path="*" element={<MainPagination></MainPagination>} />
                <Route path="/adminpanel" element={<AdminPanel></AdminPanel>} />
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


const mapStateToProps = (state) => {
    return {
        authstate: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ authanticated, notauthanticated }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main_Routers)