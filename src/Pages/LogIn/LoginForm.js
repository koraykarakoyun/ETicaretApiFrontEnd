import React, { useState, setState } from 'react';
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../Utilities/Api';
import { notify } from '../../Utilities/Notify';

function LoginForm() {


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


        var user_data =
        {
            "Email": email,
            "Password": password,
        }

        api("POST", "localhost", "7098", "users", "login", null, user_data).then(response =>{
        localStorage.setItem("token",response.token.accessToken)
        notify(response.message);
        });



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
            </div>
        </>
    )
}

export default LoginForm