/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from 'react';

import AddProduct from "./views/addProduct/addProduct";
import Chats from "./views/chats/Chats";
import Exchanges from "./views/exchanges/Exchanges";
import Home from "./views/home/Home";
import Detail from "./views/detail/Detail";
import Navbar from "./components/navbar/Nabvar";
import MyProfile from "./views/myProfile/myProfile";

import Login from "./views/login/Login";
import Register from "./components/register/Register";
import Loading from "./views/loading/Loading";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./components/resetPassword/ResetPassword";
import axios from "axios";
import io from "socket.io-client";

import "./App.css";

//const socketServer = io("http://localhost:3001");
const socketServer = io("https://lo-canjeamos-production.up.railway.app/");

//Actions
import { getAllUsers, createGoogleUser } from "../src/redux/actions";
//Auht0
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const initialDarkMode = localStorage.getItem("darkMode") === "true";

  const [darkMode, setDarkMode] = useState(initialDarkMode);

  useEffect(() => {
    setDarkModeStyles(darkMode);

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const setDarkModeStyles = (isDark) => {
    if (isDark) {
      document.body.style.backgroundColor = "rgb(25, 25, 30)";
      document.body.style.color = "grey";
    } else {
      document.body.style.backgroundColor = "whitesmoke";
      document.body.style.color = "grey";
    }
  };

  const handleInstallPWA = () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        const installPrompt = event;

        installPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('Usuario aceptó la instalación de la PWA');
          } else {
            console.log('Usuario canceló la instalación de la PWA');
          }
        });
      });
    }
  };

  //axios.defaults.baseURL = "http://localhost:3001/";
  axios.defaults.baseURL = "https://lo-canjeamos-production.up.railway.app/";
  //*Auth0
  const { user, isAuthenticated: isAuthenticatedAuth0 } = useAuth0(); //datos de BD Auht0
  const dispatch = useDispatch(); //*
  const allUsers = useSelector((state) => state.allUsers); //*

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const maxId = allUsers.reduce(
    (max, user) => (user.id > max ? user.id : max),
    0
  ); //busca cuantos user hay.//*
  const nextId = maxId + 1; //*

  const userByGoogle = { ...user, id: nextId }; //*

  const filteredUsers = allUsers.filter(
    (user) => user.email === userByGoogle.email
  ); //verifica mail en BD
  //*Area de auth0

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState(null);

  const setAuth = (status, user) => {
    setIsAuthenticated(status);
    setUserData(user);
  };

  if (!filteredUsers) {
    dispatch(createGoogleUser(userByGoogle));
  } //?despacha la funcion de crear un nuevo usuarios

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("/users/verify", {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data === true) {
            setIsAuthenticated(true);
            axios
              .get("/users/userId", {
                headers: {
                  token: token,
                },
              })
              .then((userDataResponse) => {
                setUserData({
                  email: userDataResponse.data.email,
                  id: userDataResponse.data.id,
                  username: userDataResponse.data.username,
                  image: userDataResponse.data.image,
                });
              })
              .catch((userDataError) => {
                console.error(
                  "Error al obtener los datos del usuario:",
                  userDataError
                );
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
  }, [isAuthenticated]);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth} />
      <Routes>
        <Route path="/" element={<Home />} />

<<<<<<< HEAD
        <Route path="/login" element={isAuthenticated ? (userData ? (<MyProfile userData={userData} setAuth={setAuth} toggleDarkMode={toggleDarkMode}/>
=======
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              userData ? (
                <MyProfile
                  userData={userData}
                  setAuth={setAuth}
                  toggleDarkMode={toggleDarkMode}
                  installApp={handleInstallPWA}
                />
>>>>>>> b37f7f5 (test button)
              ) : (
                <div className="spinner">
                  <div className="bounce1"></div>
                  <div className="bounce2"></div>
                  <div className="bounce3"></div>
                </div>
              )
            ) : isAuthenticatedAuth0 ? (
              user ? (<MyProfile userData={user.name} setAuth={setAuth} toggleDarkMode={toggleDarkMode}/>
              ) : (
                <div className="spinner">
                  <div className="bounce1"></div>
                  <div className="bounce2"></div>
                  <div className="bounce3"></div>
                </div>
              )
            ) : (
              <Login setAuth={setAuth} />)}/>

        <Route path="/addProduct" element={userData ? (<AddProduct userData={userData} />) : user ? (<AddProduct userData={user} />) : (<Loading />)}/>

        <Route path="/detail/:id" element={userData ? (<Detail userData={userData} />) : user ? (<Detail userData={user} />) : (<Loading />)}/>

        <Route path="/exchanges" element={userData ? (<Exchanges userData={userData} />) : user ? (<Exchanges userData={user} />) : (<Loading />)}/>

        <Route path="/exchanges" element={userData ? (<Exchanges userData={userData} />) : user ? (<Exchanges userData={user} />) : (<Loading />)}/>

        <Route path="/chats/:chatId" element={userData ? <Chats userData={userData} /> : <Loading />}/>

        <Route path="/register" element={<Register />} />

        <Route path="/forgotpassword" element={<ForgotPassword />} />

        <Route path="/resetpassword/:id" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export { socketServer, App };
