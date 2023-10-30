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
const [ userToken, setUserToken] = useState("")
const [userData, setUserData] = useState(null);

const setAuth = (status, user) => {
  setIsAuthenticated(status);
  setUserData(user);
};

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    axios
      .get("http://localhost:3001/users/verify", {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        if (response.data === true) {
          setIsAuthenticated(true);
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
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error("Error al verificar el token:", error);
        setIsAuthenticated(false);
      });
  } else {
    setIsAuthenticated(false);
  }
}, []);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={isAuthenticated ? <MyProfile/> : <Login setAuth={setAuth}/>} />
        <Route path="/register" element={ isAuthenticated ?  <MyProfile/> : <Register setAuth={setAuth}/>} />
        <Route path="/addProduct" element={<AddProduct/>} />
        <Route path="/detail/:id" element={<Detail/>}/>
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