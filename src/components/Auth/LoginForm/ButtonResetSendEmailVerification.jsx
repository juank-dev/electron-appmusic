import { sendEmailVerification } from 'firebase/auth';
import React from 'react'
import { toast } from 'react-toastify';
import { handleErrors } from './handleErrors';

export const ButtonResetSendEmailVerification = ({user, setIsLoading, setUserActive}) => {

    const resendVerificationEmail = () => {
        sendEmailVerification(user)
            .then(() => {
                toast.success("Email de verificación enviado por favor revisar su correo");
            }).catch((err) => {
                console.log("error", err);
                handleErrors(err.code)
            }).finally(() => {
                setIsLoading(false);
                setUserActive(true);
            });
    }
    
    return (
        <div className='resend-verification-email'>
            <p>Si no has recibido el email de verificación puede volver a enviarlo haciendo click <span onClick={resendVerificationEmail}>aqui.</span></p>
        </div>
    )
}
