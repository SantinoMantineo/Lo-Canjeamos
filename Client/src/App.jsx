/* eslint-disable no-unused-vars */
import axios from "axios";
import Swal from 'sweetalert2';

import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import OneSignal from 'react-onesignal';

import AddProduct from "./views/addProduct/addProduct";
import Chats from "./views/chats/Chats";
import Messages from "./views/Messages/Messages";
import Exchanges from "./views/exchanges/exchanges";
import Home from "./views/home/Home";
import Detail from "./views/detail/Detail";
import Navbar from "./components/navbar/Nabvar";
import MyProfile from "./views/myProfile/myProfile";
import AdminDash from './views/adminDash/AdminDash';
import Login from "./views/login/Login";
import Register from "./components/register/Register";
import Loading from "./views/loading/Loading";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./components/resetPassword/ResetPassword";
import UserProfile from "./views/userProfile/userProfile";

import "./App.css";
import ReviewForm from "./components/formReview/FormReview";




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

  //onesignal push notifications

  useEffect(() => {
    OneSignal.init({
      appId: 'bd442249-142f-4367-9f32-0d10df4a3be1', 
      notifyButton: {
        enable: true,
      },
    });
  }, [])

//axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.baseURL = "https://lo-canjeamos-production.up.railway.app/";

  //*Auth0
  const { user, isAuthenticated: isAuthenticatedAuth0, loginWithRedirect, isLoading } = useAuth0();

  const handleUserGoogle = async () => {
    if (isAuthenticatedAuth0) {
      const userByGoogle = {
        username: user.name,
        password: "123123",
        email: user.email,
        image: user.picture,
        ubication: `Buenos Aires, Palermo`,
        origin: "google"
      };
      // que pregunte si ya existe el usuario, si existe que haga la request a la ruta de loguin y que si no existe haga a register
      try {
        const userLog = {
          email: userByGoogle.email
        }
        const existe = await axios.get("/users/logueado", {
          params: userLog
        });        

        if(!existe.data) {
          const response = await axios.post('/users/register', userByGoogle);
          if (response) {
            await localStorage.setItem('token', response.data.token);
            setAuth(true);
  
            // Mostrar una alerta de éxito
            Swal.fire({
              icon: 'success',
              title: 'Registro exitoso',
              text: `¡Bienvenido ${userByGoogle.username}!`,
            });
          } else {
            console.log('Hubo un error al crear el usuario.');
          }

        } else {
          const response = await axios.post("/users/login", userByGoogle);
          if (response) {
            await localStorage.setItem('token', response.data.token);
            setAuth(true, response.data.usuario);
  
            // Mostrar una alerta de éxito
            Swal.fire({
              icon: 'success',
              title: `Bienvenido devuelta ${userByGoogle.username}`,
              text: '¡Te has logueado exitosamente!',
            });
          } else {
            console.log('Hubo un error al crear el usuario.');
          }
        }

      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (!isLoading) {
      handleUserGoogle();
    }
  }, [isAuthenticatedAuth0, isLoading]);


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState(null);

  const setAuth = (status, user) => {
    setIsAuthenticated(status);
    setUserData(user);
  };

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
                  rol: userDataResponse.data.rol,
                  averageRating: userDataResponse.data.averageRating,
                  plan: userDataResponse.data.plan
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
      <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth} userData={userData}/>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={isAuthenticated ? (userData ? (<MyProfile userData={userData} setAuth={setAuth} toggleDarkMode={toggleDarkMode}/>
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

        <Route path="/chats/:chatId" element={userData ? <Chats userData={userData} /> : <Loading />}/>

        <Route path="/register" element={isAuthenticated ? (userData && <MyProfile userData={userData} setAuth={setAuth}/>) : (<Register setAuth={setAuth}/>)}/>

        <Route path="/review" element={userData ? (<ReviewForm userData={userData} />) : user ? (<ReviewForm userData={user} />) : (<Loading />)}/>
        
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        <Route path="/resetpassword/:id" element={<ResetPassword />} />

        <Route path="/messages" element={userData ? (<Messages userData={userData} />) : user ? (<Messages userData={user} />) : (<Loading />)}/>

        <Route path="/admin" element={<AdminDash></AdminDash>} />
        <Route path="/UserProfile/:userId" element={<UserProfile id={userData}></UserProfile>} />
      </Routes>
    </>
  );
};

export default App;

//
