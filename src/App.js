import React,{ useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {firebase} from "./utils/firebase";
import { Auth } from "./pages/Auth";
import { ToastContainer } from "react-toastify";


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  
  const auth = getAuth(firebase);
  onAuthStateChanged(auth, (currentUser) => {

    if(!currentUser?.emailVerified) {
      logout();
      setUser(null);
    } else  {
      setUser(currentUser);
    }
    setLoading(false);
    console.log("current", currentUser);
  });
  const logout = () => {
    const auth = getAuth(firebase);
      signOut(auth).then(() => {
        // Sign-out successful.
        console.log("sesion cerrada");
      }).catch((error) => {
        // An error happened.
        console.log("Hubo un error al cerrar sesión");
      });
  }
  return (
    <>
      {!user ? <Auth />: <UserLogged />}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        style={{width: "100vw"}}
        />
    </>
  );
}

const UserLogged = () => {
  
  const logout = () => {
    console.log("click: cerrar");
    const auth = getAuth(firebase);
      signOut(auth).then(() => {
        // Sign-out successful.
        console.log("sesion cerrada");
      }).catch((error) => {
        // An error happened.
        console.log("Hubo un error al cerrar sesión");
      });
  }
  return(
    <div 
      style={{
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh"
      }}>
        <h1>Usuario Logueado</h1>
        <button onClick={logout}>Cerrar sesion!</button>

    </div>
  )
} 
export default App;
