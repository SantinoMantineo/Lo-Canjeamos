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
import Login from './views/Login/Login';
import Register from "./components/register/Register";

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

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={ isAuthenticated ? <MyProfile/> : <Login setAuth={setAuth}/>}/>
        <Route path="/login" element={isAuthenticated ? <MyProfile/> : <Login setAuth={setAuth}/>} />
        <Route path="/register" element={ isAuthenticated ?  <Login/> : <Register setAuth={setAuth}/>} />
        <Route path="/addProduct" element={<AddProduct/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/detail" element={<Detail/>}/>
        <Route path="/exchanges" element={<Exchanges/>} />
        <Route path="/chats" element={<Chats/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </>
  );
};

export default App;