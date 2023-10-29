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

  const [ userData, setUserData] = useState("")

  const getUserData = async () => {
    try {
      const user = localStorage.token;
      const response = await axios.get('http://localhost:3001/users/userData', user);
      const username = response.username;
      const id = response.id;
  
      // Update the state using setUserData function
      setUserData(username, id);
  
      console.log(`Bienvenido ${userData.username}`);
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  const [log, setLogueado] = useState(false)

  const setLog = (boolean) => {
    setLogueado(boolean);
    getUserData()
  }
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={isAuthenticated ? <MyProfile/> : <Login setAuth={setAuth} setLog={setLog}/>} />
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