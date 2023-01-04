import React, { useState, setState } from 'react';
import './Register.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../Utilities/Api';
import { notify } from '../../Utilities/Notify';
import { Button } from '@mui/material';
import ExternalLogin from '../../Components/ExternalLogin/ExternalLogin';
import { useEffect } from 'react';
import registerloginimage from "../../Image/register-login.jpg"
import { useNavigate } from "react-router-dom";

export const infoverification = (firstname, lastname, email, username, password, confirmpassword) => {
    if (firstname !== null && firstname !== ""
        && lastname !== null && lastname !== ""
        && email !== null && email !== ""
        && username !== null && username !== ""
        && password !== null && password !== ""
        && confirmpassword !== null && confirmpassword !== "") {
        if (password === confirmpassword) {
            return true;
        }
        return false;
    }
    else {
        return false;
    }
}

function RegistrationForm() {


    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "firstName") {
            setFirstName(value);
        }
        if (id === "lastName") {
            setLastName(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "username") {
            setUsername(value);
        }
        if (id === "password") {
            setPassword(value);
        }
        if (id === "confirmPassword") {
            setConfirmPassword(value);
        }

    }



    const handleSubmit = () => {
        if (infoverification(firstName, lastName, email, username, password, confirmPassword)) {

            var user_data =
            {
                "Name": firstName,
                "Surname": lastName,
                "Email": email,
                "Username": username,
                "Password": password,
                "PasswordConfirm": confirmPassword
            }

            api("POST", "localhost", "7098", "users", "createuser", null, user_data).then((res) => {
                if(res.isSuccess){
                navigate("/login");
                }
                
            });

        }
        else {
            notify("bilgilerinizi kontrol ediniz");
        }


    }

    return (
        <div className='backgroundImageDiv' style={{ backgroundImage: `url(${registerloginimage})` }}>

            <div className="form" style={{ border: "1px solid black" }}>
                <div className="form-body">
                    <div className="firstname">
                        <label className="form__label" htmlFor='firstName'>Ad</label>
                        <input id="firstName" className="form__input" type="text" defaultValue={null} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="lastname">
                        <label className="form__label" htmlfor='lastName'>Soyad</label>
                        <input type="text" id="lastName" defaultValue={null} className="form__input" onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="email">
                        <label className="form__label" htmlfor='email'>E-Posta</label>
                        <input type="email" id="email" className="form__input" defaultValue={null} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="username">
                        <label className="form__label" htmlfor='username'>Kullanıcı Adı</label>
                        <input type="text" id="username" className="form__input" defaultValue={null} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="password">
                        <label className="form__label" htmlfor='password'>Şifre</label>
                        <input className="form__input" type="password" id="password" defaultValue={null} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="confirm-password">
                        <label className="form__label" htmlfor='confirmPassword'>Şifreyi Onaylayın</label>
                        <input className="form__input" type="password" id="confirmPassword" defaultValue={null} onChange={(e) => handleInputChange(e)} />
                    </div>
                </div>
                <div className="footer">

                    <Button style={{
                        width: "88%", height: "2.8rem"
                    }} onClick={handleSubmit} type="submit" variant="contained">Kayıt Ol</Button>

                    <ExternalLogin></ExternalLogin>



                </div>
            </div>

        </div>



    )

}

export default RegistrationForm