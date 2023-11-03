import { Link } from "react-router-dom";
import Logo from "../../assets/locan.png";
import smile from "../../assets/smile.gif";
import style from "./Nabvar.module.css";
//Auth0
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = ({ isAuthenticated, setAuth, userData }) => {

  const { isAuthenticated:isAuthenticatedAuth0 ,logout:loguotAuth0} = useAuth0();
  
  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };
  return (
    <div className={isAuthenticatedAuth0 || isAuthenticated ? style.navbar : style.navbarOff}>
      {/* {isAuthenticatedx && userData ? (
        <div>
          <h2>
            Hola, {userData.username}!{" "}
            <img src={smile} className={style.smile}></img>
          </h2>
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

      {(isAuthenticatedAuth0 || isAuthenticated) && (
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
      ) :         
      (<Link to="/addProduct">
      <button className={style.iconosFalse}>
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/sf-regular/48/add.png"
          alt="Add"
        />
        Agregar 🔒
      </button>
    </Link>
  )}

      {(isAuthenticated || isAuthenticatedAuth0) && (

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
      ) : (
        <Link to="exchanges">
        <button className={style.iconosFalse}>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-rounded/48/available-updates.png"
            alt="Available Updates"
          />
          Canjes 🔒
        </button>
      </Link> 
      )}

      {(isAuthenticated || isAuthenticatedAuth0) && (

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
      ) : (
        <Link to="/chats">
        <button className={style.iconosFalse}>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/fluency-systems-regular/48/chat--v1.png"
            alt="Chat"
          />
          Mensajes 🔒
        </button>
      </Link>
      )}

      <Link to="/login">
        {(isAuthenticated || isAuthenticatedAuth0) ? (
          <button className={style.iconos}>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/puffy/32/experimental-user-puffy.png"
              alt="Usuario"
            />
            Perfil
          </button>
        ) : (
          <button className={style.iconos}>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/puffy/32/experimental-user-puffy.png"
              alt="Usuario"
            />
            Iniciar sesión
          </button>
        )}
      </Link>

      {isAuthenticated ? (
        <button className={style.logout} onClick={logout}>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/fluency-systems-filled/48/exit.png"
            alt="exit"
          />
          Salir
        </button>
      ) : isAuthenticatedAuth0 ? (
        <button className={style.logout} onClick={() => loguotAuth0({ logoutParams: { returnTo: window.location.origin } })}>
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
