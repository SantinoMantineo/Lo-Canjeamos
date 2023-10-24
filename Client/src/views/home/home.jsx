import React from 'react'
import Cards from '../../components/cards/Cards'
import Filters from '../../components/filters/Filters'
import Header from '../../components/header/Header'
import style from './Home.module.css'

const Home = () => {
  return (
    <>
    <Header></Header>
    <Filters></Filters>
    <Cards></Cards>
    </>
  )
}

export default Home