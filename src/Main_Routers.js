import React from 'react'
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


const Main_Routers = (props) => {

    let routes = (
        <></>
    );
    if (!props.authstate) {
        routes = (
            <Routes>
                <Route path="*" element={<NotFound/>} />
                <Route path="/" element={<MainPage></MainPage>}/>
                <Route path="/register" element={<RegistrationForm></RegistrationForm>} />
                <Route path="/login" element={<LoginForm></LoginForm>} />
            </Routes>
        )
    }
    if (props.authstate) {
        routes = (
            <Routes>
                <Route path="*" element={<MainPage></MainPage>} />
                <Route path="/adminpanel" element={<AdminPanel></AdminPanel>} />
                <Route path="/products" element={<ProductsPage></ProductsPage>} />
                <Route path="/addproduct" element={<ProductAdd ></ProductAdd>} />
                <Route path="/updateproduct" element={<ProductUpdate ></ProductUpdate>} />
                <Route path="/updateproduct/:id" element={<ProductUpdate ></ProductUpdate>} />
                <Route path="/deleteproduct" element={<ProductDelete ></ProductDelete>} />
                <Route path="/deleteproduct/:id" element={<ProductDelete></ProductDelete>} />
                <Route path="/fileupload/:id" element={<FileUploadModelDialog></FileUploadModelDialog>} />
                <Route path="/mybasket" element={<MyBasket></MyBasket>} />

            </Routes>
        )
    }

    return (
        <BrowserRouter>
            <Navbar2></Navbar2>
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