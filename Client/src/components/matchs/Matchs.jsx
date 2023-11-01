import React from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import Product from "../../assets/product.jpeg";
import Product2 from "../../assets/shoes.jpeg";
import Logo from "../../assets/favicon.png"
import style from "./Matchs.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { getMatches } from "../../redux/actions";

const Matchs = ({ userData }) => {
  const matches = useSelector((state) => state.matches);
  const dispatch = useDispatch();
  const userId = userData.id

  useEffect(() => {
    dispatch(getMatches(userId));
    }, [userId, dispatch]);

  return (
    <>
    <Link>
      <div className={style.matchs}>
        <img src={Product} className={style.img}></img>
        <img
          width="24"
          height="24"
          src={Logo}
          alt="available-updates"
          className={style.matchLogo}
        />
        <img src={Product2} className={style.img}></img>
      </div>
      </Link>
    </>
  );
};

export default Matchs;
