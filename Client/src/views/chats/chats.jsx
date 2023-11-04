import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import ChatsMessages from "../../components/chats/ChatsMessages";
import { getAllChats } from "../../redux/actions";

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
  );
};

export default Chats;
