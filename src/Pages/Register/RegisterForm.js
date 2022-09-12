import React, { useState, setState } from 'react';
import './Register.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../Utilities/Api';
import { notify } from '../../Utilities/Notify';

export const infoverification = (firstname, lastname, email, password, confirmpassword) => {
    if (firstname !== null && firstname !== ""
        && lastname !== null && lastname !== ""
        && email !== null && email !== ""
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

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
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
        if (id === "password") {
            setPassword(value);
        }
        if (id === "confirmPassword") {
            setConfirmPassword(value);
        }

    }

  

    const handleSubmit = () => {
        if(infoverification(firstName,lastName,email,password,confirmPassword)){
            notify("kayit olundu");
        }
        else{
            notify("bilgilerinizi kontrol ediniz");
        }


    }

    return (
        <>
            <ToastContainer />
            <div className="form">
                <div className="form-body">
                    <div className="username">
                        <label className="form__label" htmlFor='firstName'>First Name </label>
                        <input className="form__input" type="text" value={firstName} onChange={(e) => handleInputChange(e)} id="firstName" placeholder="First Name" />
                    </div>
                    <div className="lastname">
                        <label className="form__label" htmlfor='lastName'>Last Name </label>
                        <input type="text" name="" id="lastName" defaultValue={null} className="form__input" onChange={(e) => handleInputChange(e)} placeholder="LastName" />
                    </div>
                    <div className="email">
                        <label className="form__label" htmlfor='email'>Email </label>
                        <input type="email" id="email" className="form__input" defaultValue={null} onChange={(e) => handleInputChange(e)} placeholder="Email" />
                    </div>
                    <div className="password">
                        <label className="form__label" htmlfor='password'>Password </label>
                        <input className="form__input" type="password" id="password" defaultValue={null} onChange={(e) => handleInputChange(e)} placeholder="Password" />
                    </div>
                    <div className="confirm-password">
                        <label className="form__label" htmlfor='confirmPassword'>Confirm Password </label>
                        <input className="form__input" type="password" id="confirmPassword" defaultValue={null} onChange={(e) => handleInputChange(e)} placeholder="Confirm Password" />
                    </div>
                </div>
                <div className="footer">
                    <button onClick={() => handleSubmit()} type="submit" className="btn">Register</button>
                </div>
            </div>
        </>
    )
}

export default RegistrationForm