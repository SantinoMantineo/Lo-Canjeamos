import React from 'react'
import Cards from '../../components/cards/Cards'
import Filters from '../../components/filters/Filters'
import Header from '../../components/header/Header'
import Banner from "../../assets/banner1.jpg";
import Banner2 from "../../assets/banner2.jpg";
import style from './Home.module.css'

const Home = () => {
  return (
    <>
    <Header banner1={Banner} banner2={Banner2}></Header>
    <Filters></Filters>
    <Cards></Cards>
    </>
  )
}

export default Home