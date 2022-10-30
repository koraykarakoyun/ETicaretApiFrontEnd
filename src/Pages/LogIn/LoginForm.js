import React, { useState, setState } from 'react';
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../Utilities/Api';
import { notify } from '../../Utilities/Notify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addLoginInfo, removeLogınInfo } from '../../Redux/Action/LoginAction';
import GoogleLogin from 'react-google-login';
import { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import { gapi } from 'gapi-script';
import { authanticated, notauthanticated } from '../../Redux/Action/AuthAction';
import { Navigate } from 'react-router';
import { Button } from '@mui/material';
import ExternalLogin from '../../Components/ExternalLogin/ExternalLogin';
import registerloginimage from "../../Image/register-login.jpg"

function LoginForm(props) {

  
    

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);


    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id === "email") {
            setEmail(value);
        }

        if (id === "password") {
            setPassword(value);
        }


    }

    const handleSubmit = () => {

        let user_data =
        {
            "Email": email,
            "Password": password,
        }

        api("POST", "localhost", "7098", "auth", "login", null, user_data, null).then(res => {
            if (res.isSuccess == true) {
                console.log(res);
                props.authanticated("internal");
                localStorage.setItem("token", res.token.accessToken)
                localStorage.setItem("refreshtoken", res.token.refreshToken)
                notify(res.message)

            }

        })



    }

    return (
        <div className='backgroundImageDiv' style={{backgroundImage:`url(${registerloginimage})`}}>
            <ToastContainer />

            <div style={{ border: "1px solid black" }}  className="form">
                <div className="form-body">

                    <div className="email">
                        <label className="form__label" htmlfor='email'>E-Posta</label>
                        <input type="email" id="email" className="form__input" defaultValue={null} onChange={(e) => handleInputChange(e)} />
                    </div>

                    <div className="password">
                        <label className="form__label" htmlfor='password'>Şifre</label>
                        <input className="form__input" type="password" id="password" defaultValue={null} onChange={(e) => handleInputChange(e)} />
                    </div>

                </div>
                <div className="footer">

                    <Button style={{
                        width: "88%", height: "2.8rem"
                    }} onClick={() => handleSubmit()} type="submit" variant="contained">Giriş Yap</Button>

                    <ExternalLogin></ExternalLogin>
                </div>

            </div>
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userinfostate: state.login,
        authstate: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ addLoginInfo, removeLogınInfo, authanticated, notauthanticated }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)

