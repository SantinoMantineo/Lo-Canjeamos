import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
import About from "./views/about/About";
import AddProduct from "./views/addProduct/AddProduct"
import Chats from "./views/chats/Chats"
import Exchanges from "./views/exchanges/Exchanges"
import Home from "./views/home/Home";
import Navbar from "./components/navbar/Nabvar";
import MyProfile from "./views/myProfile/MyProfile"
import UserProfile from "./views/userProfile/UserProfile"
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/profile" element={<MyProfile/>} />
        <Route path="/addProduct" element={<AddProduct/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/exchanges" element={<Exchanges/>} />
        <Route path="/chats" element={<Chats/>} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
