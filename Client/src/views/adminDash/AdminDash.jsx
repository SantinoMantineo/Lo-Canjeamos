import React from "react";
import style from "./AdminDash.module.css";

const AdminDash = () => {
  return (
    <>
      <h3>Admin Panel</h3>
      <div className={style.topContainer}>
        <div className={style.tile1}>
          <p>altas</p>
          <h4 className={style.newUsers}>1500</h4>
        </div>
        <div className={style.tile2}>
          <p>bajas</p>
          <h4 className={style.delUsers}>50</h4>
        </div>
        <div className={style.tile3}>
          <p>publicaciones</p>
          <h4 className={style.publications}>4500</h4>
        </div>
        <div className={style.tile4}>
          <p>matchs</p>
          <h4 className={style.matchs}>750</h4>
        </div>
        <div className={style.tile5}>
          <p>premium</p>
          <h4 className={style.premium}>550</h4>
        </div>
      </div>
      <div className={style.filters}>
        <div className={style.uFilters}>
          <h3>User filters</h3>
          <div className={style.uSelect}>
            <select>
              <option>Premium</option>
            </select>
            <select>
              <option>Rating</option>
            </select>
          </div>
        </div>
        <div className={style.pFilters}>
          <h3>Publications filters</h3>
          <div className={style.pSelect}>
            <select>
              <option>Premium</option>
            </select>
            <select>
              <option>Premium</option>
            </select>
            <select>
              <option>Premium</option>
            </select>
          </div>
        </div>
      </div>
      <div className={style.bottomContainer}>
        <div className={style.column1}>
          <div className={style.uList}>
            <h4>maxi@mail.com</h4>
            <h4>ejemplo@mail.com</h4>
          </div>
        </div>
        <div className={style.column2}>
          <div className={style.pList}>
            <h4>Pava Electrica</h4>
            <h4>Sillon Antiguo</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDash;
