import React from 'react'
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
import Landing from "./views/landing/landing"
import About from "./views/about/about"
// import addProduct from "./views/addProduct/addProduct"
// import chats from "./views/chats/chats"
// import exchanges from "./views/exchanges/exchanges"
import Home from "./views/home/home"
// import myProfile from "./views/myProfile/myProfile"
// import userProfile from "./views/userProfile/userProfile"
import "./App.css"

const App = () => {


  return (
    <div>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/about" element={<About/>} />
    </Routes>
  </div>
  )
}

export default App