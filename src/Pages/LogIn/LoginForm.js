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
import { authanticated,notauthanticated} from '../../Redux/Action/AuthAction';

function LoginForm(props) {

    const clientId = "858096983515-prmmpeohub6v3u5smr2cc02o6u4mkn2v.apps.googleusercontent.com";
    const FacebookAppId = "630541088591232";

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);

    });


    const onSuccess = (res) => {
        let data = {
            "IdToken": res.tokenId,
            "FirstName": res.profileObj.givenName,
            "LastName": res.profileObj.familyName,
            "UserName": res.profileObj.name,
            "Email": res.profileObj.email,
            "Provider": res.tokenObj.idpId,
        }

        api("POST", "localhost", "7098", "auth", "google", null, data, null)
            .then(res => {
                if (res.isSuccess) {

                    notify("Google Girisi Yapildi")
                    localStorage.setItem("googletoken", res.token.accessToken)

                }
                else {
                    console.log(res.message)
                }
            }
            );
    };

    const onFailure = (err) => {
        console.log('failed:', err);
    };

    const responseFacebook = (response) => {
        let data = {
            "accessToken": String(response.accessToken)
        }
        api("POST", "localhost", "7098", "auth", "facebook", null, data, null).then(res => {
            if (res.isSuccess) {

                notify("Facebook Girisi Yapildi")
                localStorage.setItem("facebooktoken", res.token.accessToken)
            }
            else {
                console.log(res.message)
            }


        }
        );
    }

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
                props.authanticated();
                localStorage.setItem("token",res.token.accessToken)
                localStorage.setItem("refreshtoken",res.token.refreshToken)
                notify(res.message)
            }

        })

    }

    return (
        <>
            <ToastContainer />
            <div className="form">
                <div className="form-body">

                    <div className="email">
                        <label className="form__label" htmlfor='email'>Email </label>
                        <input type="email" id="email" className="form__input" defaultValue={null} onChange={(e) => handleInputChange(e)} placeholder="Email" />
                    </div>

                    <div className="password">
                        <label className="form__label" htmlfor='password'>Password </label>
                        <input className="form__input" type="password" id="password" defaultValue={null} onChange={(e) => handleInputChange(e)} placeholder="Password" />
                    </div>

                </div>
                <div className="footer">
                    <button onClick={() => handleSubmit()} type="submit" className="btn">Login</button>
                </div>
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false}
                />
                <FacebookLogin
                    appId={FacebookAppId}
                    callback={responseFacebook}
                />
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        userinfostate: state.login,
        authstate:state.auth
    }
}

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ addLoginInfo, removeLogınInfo ,authanticated,notauthanticated }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)

