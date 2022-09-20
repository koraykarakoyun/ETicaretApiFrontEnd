import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import { api } from '../../Utilities/Api';
import { useState } from 'react';


export default function MainPage(props) {


  const clientId = "858096983515-prmmpeohub6v3u5smr2cc02o6u4mkn2v.apps.googleusercontent.com";
  const [userdata, setUserdata] = useState({});

  const onSuccess = (res) => {
    let data = {
      "IdToken": res.tokenId,
      "FirstName": res.profileObj.givenName,
      "LastName": res.profileObj.familyName,
      "UserName": res.profileObj.name,
      "Email": res.profileObj.email,
      "Provider": res.tokenObj.idpId,
    }

    api("POST", "localhost", "7098", "users", "google", null, data, null)
      .then(res => localStorage.setItem("token", res.token.accessToken)
      );
  };

  const onFailure = (err) => {
    console.log('failed:', err);
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);

  });
  return (


    <div style={{ marginLeft: "64px" }}>

      <Stack direction="row" spacing={2}>

        <Button variant="outlined" href="#outlined-buttons">
          <Link to="/register">Register</Link>
        </Button>

        <Button variant="outlined" href="#outlined-buttons">
          <Link to="/login">Log In</Link>
        </Button>

        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={false}
        />


      </Stack>
    </div>

  );
}
