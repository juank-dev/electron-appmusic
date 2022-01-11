import { toast } from "react-toastify";

export const handleErrors = (code) => {
    switch (code) {
        case "auth/wrong-password":
            toast.warning("El usuario o la contraseña son incorrectos.");
            break;
    
        case "auth/too-many-requests":
            toast.warning("Haz enviado demasiadas solicitudes de reenvio de email de confirmacion en muy poco tiempo.");
            break;

        case "auth/user-not-found":
            toast.warning("Usuario o contraseña es incorrecto.");
            break;
    
        default:
            break;
    }
}