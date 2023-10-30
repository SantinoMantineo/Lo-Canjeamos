/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
import About from "./views/about/About";
import AddProduct from "./views/addProduct/AddProduct"
import Chats from "./views/chats/Chats"
import Exchanges from "./views/exchanges/Exchanges"
import Home from "./views/home/Home";
import Detail from './views/detail/Detail'
import Navbar from "./components/navbar/Nabvar";
import MyProfile from "./views/myProfile/MyProfile"
import UserProfile from "./views/userProfile/UserProfile"
import Login from './views/login/Login';
import Register from "./components/register/Register";
import axios from "axios";
import "./App.css";

const App = () => {

/* const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 21 || currentHour < 6) {
      setDarkMode(true);
      document.body.style.backgroundColor = "rgb(25, 25, 25)";
      document.body.style.color = "whitesmoke";
    }
  }, []); */

const [ isAuthenticated, setIsAuthenticated ] = useState(false);
const setAuth = (boolean) => {
  setIsAuthenticated(boolean);
};
const [ userToken, setUserToken] = useState("")
const [ userData, setUserData ] = useState()
useEffect(() => {
  // Intentar obtener el token del almacenamiento local
  const token = localStorage.getItem("token");

  if (token) {
    // Si existe un token, verifica si es válido
    axios
      .get("http://localhost:3001/users/verify", {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        if (response.data === true) {
          // Si el token es válido, autentica al usuario y obtén sus datos
          setIsAuthenticated(true);

          // Obtener los datos del usuario
          axios
            .get("http://localhost:3001/users/userId", {
              headers: {
                token: token,
              },
            })
            .then((userDataResponse) => {
              setUserData({
                email: userDataResponse.data.email,
                id: userDataResponse.data.id,
                username: userDataResponse.data.username,
              });
            })
            .catch((userDataError) => {
              console.error("Error al obtener los datos del usuario:", userDataError);
            });
        } else {
          // Si el token no es válido, el usuario no está autenticado
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error("Error al verificar el token:", error);
        setIsAuthenticated(false);
      });
  } else {
    // Si no hay token en el almacenamiento local, el usuario no está autenticado
    setIsAuthenticated(false);
  }
}, []);
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} userData={userData} setAuth={setAuth}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={isAuthenticated ? <MyProfile/> : <Login setAuth={setAuth}/>} />
        <Route path="/register" element={ isAuthenticated ?  <Login setAuth={setAuth}/> : <Register setAuth={setAuth}/>} />
        <Route path="/addProduct" element={<AddProduct/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/detail" element={<Detail/>}/>
        <Route path="/exchanges" element={<Exchanges/>} />
        <Route path="/chats" element={<Chats/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login setAuth={setAuth}/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </>
  );
};

export default App;