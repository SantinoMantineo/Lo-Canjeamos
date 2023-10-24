import React from 'react'
import style from './Home.module.css'
import { motion } from 'framer-motion';
import LoadingAnimation from "./loadingAnimation/loadingAnimation"

const Home = () => {
  return (
    <>

    <div className={style.container}>
    {/* <motion.div>
      <LoadingAnimation/>
    </motion.div> */}
      Home
    </div>
    </>
  )
}

export default Home