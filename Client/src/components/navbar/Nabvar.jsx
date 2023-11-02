import { Link } from "react-router-dom";
import Logo from "../../assets/locan.png";
import smile from '../../assets/smile.gif'
import style from "./Nabvar.module.css";
import LogoutButton from "../../views/Auth0/LogoutButton"
//Auth0
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = ({ isAuthenticatedBd, setAuth, userData }) => {

  const { isAuthenticated,user,logout} = useAuth0();

  const logoutBd = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <div className={style.navbar}>

      {/* {isAuthenticatedBd || isAuthenticated && userData || user ? (
        <div>
          <h2>Hola, {userData ? username : user.name}! <img src={smile} className={style.smile}></img></h2>
        </div>
      ) : null} */}

      <Link to="/" className={style.link}>
        <img src={Logo} className={style.logo} alt="Locan" />
      </Link>

      <Link to="/">
        <button className={style.iconos}>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/fluency-systems-regular/48/home--v1.png"
            alt="Home"
          />
          Principal
        </button>
      </Link>

      <Link to="/addProduct">
        <button className={style.iconos}>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/sf-regular/48/add.png"
            alt="Add"
          />
          Agregar
        </button>
      </Link>

      <Link to="exchanges">
        <button className={style.iconos}>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-rounded/48/available-updates.png"
            alt="Available Updates"
          />
          Canjes
        </button>
      </Link>
        {isAuthenticatedBd || isAuthenticated && 
        <Link to="/chats">
        <button className={style.iconos}>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/fluency-systems-regular/48/chat--v1.png"
            alt="Chat"
          />
          Mensajes
        </button>
      </Link>
        }

      <Link to="/login">
        {isAuthenticated || isAuthenticatedBd ? 
        <button className={style.iconos}>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/puffy/32/experimental-user-puffy.png"
            alt="Usuario"
          />
          Perfil
        </button> : <button className={style.iconos}>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/puffy/32/experimental-user-puffy.png"
            alt="Usuario"
          />
          Iniciar sesión
        </button>}
      </Link>
    
      {isAuthenticatedBd ? (
        <button className={style.logout} onClick={logoutBd}>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/fluency-systems-filled/48/exit.png"
            alt="exit"
          />
          Salir
        </button>
      ) : isAuthenticated ? (
        <button className={style.logout} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              <img width="24"
              height="24"
              src="https://img.icons8.com/?size=256&id=n5UlZzfuGwnQ&format=png"
              alt="exit"
               />
               Exit google
              </button>
              ) : null}
    </div>
  );
};

export default NavBar;
