import React from 'react'
import GoogleLogin from 'react-google-login';
import { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import { gapi } from 'gapi-script';
import { api } from '../../Utilities/Api';
import { notify } from '../../Utilities/Notify';
import { authanticated, notauthanticated } from '../../Redux/Action/AuthAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addLoginInfo, removeLogınInfo } from '../../Redux/Action/LoginAction';

const ExternalLogin = (props) => {

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
                    props.authanticated("google");

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
                props.authanticated("facebook");
            }
            else {
                console.log(res.message)
            }


        }
        );
    }


    return (

        <div>
            <GoogleLogin
                id="google_button"
                clientId={clientId}
                buttonText="GOOGLE ILE GIRIŞ YAP"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
            />
            <FacebookLogin
                appId={FacebookAppId} w
                callback={responseFacebook}
                buttonStyle={{ width: "43%", height: "2.8rem", fontSize: "0.75rem", marginLeft: "2%", marginTop: "2%", paddingTop: "2.4%", borderRadius: "3px" }}
                textButton="Facebook Ile Giriş Yap"

            />
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

export default connect(mapStateToProps, mapDispatchToProps)(ExternalLogin)