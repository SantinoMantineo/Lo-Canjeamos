
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import ChatsMessages from "../../components/chats/ChatsMessages";
import { getAllChats } from "../../redux/actions";

import img from "../../assets/avatar.jpg";
import img2 from '../../assets/avatar2.png'
import style from "./Chats.module.css";
import style from "./Chats.module.css";
import Login from "../login/Login";

const Chats = ({ userData }) => {
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const allChats = useSelector((state) => state.chats);
  
  const userChats = allChats.filter((chat) => chat.user1Id === userData.id || chat.user2Id === userData.id);
  console.log("chats del usuario: ", userChats);

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);


  return (
    <>
    <div>
        <h3>Tus chats: </h3>
      <div>
        <ul>
          {userChats && userChats.map((chat) => (
            <li key={chat.id}>
              <p>Chat n°{chat.id}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ChatsMessages chatId={chatId} userData={userData}></ChatsMessages>
      </div>
    </div>
          </>

     /* <h3>Tus mensajes</h3>
      <div className={style.chats}>
        <div className={style.chat}>
          <img src={img} className={style.imgProf}></img>
          <p className={style.name}>Emir Khaleb</p>
        </div>

        <div className={style.conversations}>
          <div className={style.conversation1}>
            <img src={img} className={style.imgOther}></img>
            <p className={style.convOther}>Hola!</p>
          </div>

          <div className={style.conversation2}>
            <p className={style.convMe}>Hola! Cómo estás?</p>
            <img src={img2} className={style.imgMe}></img>
          </div>

          <div className={style.conversation1}>
            <img src={img} className={style.imgOther}></img>
            <p className={style.convOther}>
              Muy bien! Dónde podemos encontrarnos para el intercambio?
            </p>
          </div>

          <div className={style.conversation2}>
            <p className={style.convMe}>Yo vivo en Alvear 123, si te parece podeés pasar por casa, o nos encontramos en un lugar neutral.</p>
            <img src={img2} className={style.imgMe}></img>
          </div>
          <div className={style.message}>
            <input type="text" placeholder="Ingrese un mensaje">

            </input>
            <button>
            <img width="24" height="24" src="https://img.icons8.com/fluency-systems-regular/48/sent--v1.png" alt="sent--v1"/>
            </button>
          </div>
        </div>
      </div>
    </> */
  );
};

export default Chats;
