import React, { useState } from 'react';
import {LoginForm, RegisterForm, AuthOptions} from "../../components/Auth";
import BackgroundApp from "../../assets/images/background-auth.jpg";
import LogoWhite from "../../assets/images/logo-name-white.png";
import "./Auth.scss";

export const Auth = () => {
    const [selectedForm, setSelectedForm] = useState(null);

    const handleForm = () => {
        switch (selectedForm) {
            case "login":
                return <LoginForm setSelectedForm={setSelectedForm}/>;
            case "register":
                return <RegisterForm setSelectedForm={setSelectedForm}/>;
            default:
                return <AuthOptions setSelectedForm={setSelectedForm} />;
        }
    }

    return (
        <div className="auth" style={{backgroundImage: `url(${BackgroundApp})`}}>
            <div className="auth__dark"></div>
            <div className="auth__box">
                <div className="auth__box-logo">
                    <img src={LogoWhite} alt="logo"/>
                </div>
                {handleForm()}
            </div>
            
        </div>
    )
}
