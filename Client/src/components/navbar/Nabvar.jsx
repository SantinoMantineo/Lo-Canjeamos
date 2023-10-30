import { Link } from "react-router-dom";
import Logo from "../../assets/locan.png";
import style from "./Nabvar.module.css";

const NavBar = ({ isAuthenticated, userData, setAuth }) => {

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  }
  return (
    <div className={style.navbar}>
      <div className={style.div}></div>

      {isAuthenticated && userData ? (
        <h2 className={style.saludo}>Hola, {userData.username}</h2>
      ) : null}
      
      {isAuthenticated ? (
        <button className={style.logout} onClick={logout}>LOGOUT</button>
      ) : null}
      <Link to="/home" className={style.link}>
        <img src={Logo} className={style.logo} alt="Locan" />
      </Link>
      
      <Link to="/home">
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
        <button className={style.iconos}>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/puffy/32/experimental-user-puffy.png"
            alt="Usuario"
          />
          Iniciar sesión
        </button>
      </Link>
    </div>
  );
};

export default NavBar;
