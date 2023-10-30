import { Link } from "react-router-dom";
import Logo from "../../assets/locan.png";
import style from "./Nabvar.module.css";

const NavBar = ({ isAuthenticated, userData, setAuth, setUserData }) => {

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    setUserData("")
  };

  return (
    <div className={style.navbar}>
      {isAuthenticated && userData ? (
        <div className={style.saludo}>
          <h2>Hola, {userData.username}! 😃</h2>
        </div>
      ) : null}

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

      <Link to="/login">
        {isAuthenticated ? 
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
      ) : null}
    </div>
  );
};

export default NavBar;
