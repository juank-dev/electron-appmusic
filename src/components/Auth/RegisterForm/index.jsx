import React, { useState } from 'react'
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { validateEmail } from "../../../utils/validations.js";
import { firebase } from "../../../utils/firebase";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification  } from "firebase/auth";
import "./styles.scss";
import { defaultForm } from "./defaultValueForm";
import { toast } from 'react-toastify';

export const RegisterForm = ({setSelectedForm}) => {

    const [formData, setFormData] = useState(defaultForm);
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onChangeData = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
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
        if(formData.userName.length < 3) {
            errors.userName = true;
            formOk = false;
        }
        setFormError(errors);
        if(formOk) {
            setIsLoading(true);
            const auth = getAuth(firebase);
            createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                // Signed in
                /* const user = userCredential.user; */
                changeUserName();
                sendVerificationEmail();
                toast.success('Registro ok');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log("error : ", errorCode, errorMessage);
                toast.error("Error al crear la cuenta, intentalo mas tarde");
            }).finally(() =>  {
                setIsLoading(false);
                setSelectedForm(null);
            });
        }

    }

    const changeUserName = async () => {
        let auth = getAuth(firebase);

        updateProfile(auth.currentUser, {
            displayName: formData.userName,
          }).then(() => {
            console.log("Usuario actualizado");
          }).catch((error) => {
            toast.error("Error al actualizar el nombre del usuario");
          });
       
    }

    const sendVerificationEmail = () => {
        const auth = getAuth(firebase);
        sendEmailVerification(auth.currentUser)
        .then(() => {
            toast.success("Email de verificación enviado por favor revisar su correo");
        }).catch(() => {
            toast.error("Error al enviar email de verificación");
        });
    }
    return (
        <div className="register-form">
            <h2>Empieza a escuchar con una cuenta de AppMusic gratis.</h2>
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
                                Elige una contraseña superior a 5 caracteres
                            </span>
                        )
                    }
                </Form.Field>
                <Form.Field>
                    
                <Input 
                    type="text" 
                    name="userName" 
                    placeholder='Tu nombre?' 
                    icon="user circle"
                    error={formError.userName}
                    />
                     {
                        formError.userName && (
                            <span className="error-text">
                               Por favor introduce un nombre mayor a 3 caracteres
                            </span>
                        )
                    }
                </Form.Field>
                
                <Button type='submit' loading={isLoading}>Registrarme</Button>
            </Form>
            <div className="register-form__options">
                <p onClick={() => {setSelectedForm(null)}}>Volver</p>
                <p >Ya tienes AppMusic <span onClick={() => {setSelectedForm("login")}}>Iniciar Sesión</span></p>
            </div>
        </div>
    )
}
