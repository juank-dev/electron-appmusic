import React from 'react'
import "./styles.scss";
import { Button } from 'semantic-ui-react';

export const AuthOptions = ({setSelectedForm}) => {
    return (
        <div className='auth-options'>
            <h2>Millones de canciones en nuestra App</h2>
            <Button className="register" onClick={() => setSelectedForm("register")}>Registrese Gratis</Button>
            <Button className="login" onClick={() => setSelectedForm("login")}>Iniciar sesión</Button>
        </div>
    )
}
