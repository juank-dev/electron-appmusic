import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { firebase } from '../../../utils/firebase';
import { validateEmail } from '../../../utils/validations';
import { ButtonResetSendEmailVerification } from './ButtonResetSendEmailVerification';
import { defaultForm } from './defaultValueForm';
import { handleErrors } from './handleErrors';
import "./styles.scss";

export const LoginForm = ({setSelectedForm}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(defaultForm);
    const [formError, setFormError] = useState({});
    const [userActive, setUserActive] = useState(true);
    const [user, setUser] = useState(null);

    const handleSubmit = () => {
        setFormError({});
        let errors = {};
        let formOk = true;
        if(!validateEmail(formData.email)) {
            errors.email = true;
            formOk = false;
        }
        if(formData.password.length < 6) {
            errors.password = true;
            formOk = false;
        }
        setFormError(errors);
        if(formOk) {
            setIsLoading(true);
            const auth = getAuth(firebase);
            signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                setUser(user);
                setUserActive(user.emailVerified);
                if(!user.emailVerified) {
                    toast.warning("Para poder ingresar antes tienes que verificar el correo");
                } else {
                    toast.success("Logueado correctamente");
                }
                // ...
                
            })
            .catch((error) => {
                const errorCode = error.code;
                handleErrors(errorCode);
            }).finally(() =>  {
                setIsLoading(false);
            });
        }
    }

    const onChangeData = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }


    return (
        <div className="login-form">
            <h2>Música para todos.</h2>
            <Form onSubmit={handleSubmit} onChange={onChangeData}>
                <Form.Field>
                    <Input 
                    type="text" 
                    name="email" 
                    placeholder='Correo electronico' 
                    icon="mail outline"
                    error={formError.email}
                    />
                    {
                        formError.email && (
                            <span className="error-text">
                                Por favor introducir un correo electronico valido
                            </span>
                        )
                    }
                </Form.Field>
                <Form.Field>
                    
                <Input 
                    type={showPassword ? "text": "password"} 
                    name="password" 
                    placeholder='Contraseña' 
                    icon={showPassword ? (
                        <Icon name="eye slash outline" link onClick={handleShowPassword} />
                    ): (
                        <Icon name="eye" link onClick={handleShowPassword} />
                    ) } 
                    error={formError.password}
                    />
                    {
                        formError.password && (
                            <span className="error-text">
                                Por favor escribir una contraseña superior a 5 caracteres
                            </span>
                        )
                    }
                </Form.Field>
                
                <Button type='submit' loading={isLoading}>Iniciar Sesion</Button>
                {!userActive && <ButtonResetSendEmailVerification user={user} setIsLoading={setIsLoading} setUserActive={setUserActive} />}
                <div className="login-form__options">
                <p onClick={() => {setSelectedForm(null)}}>Volver</p>
                <p >¿No tienes cuenta? <span onClick={() => {setSelectedForm("register")}}>Registrarse</span></p>
            </div>
            </Form>
            
        </div>
    )
}
