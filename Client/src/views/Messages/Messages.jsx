import { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getAllChats, getAllUsers } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import style from "./Messages.module.css";

const Messages = ({ userData }) => {
  const userId = userData.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chats = useSelector((state) => state.chats);
  const allUsers = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllChats());
  }, [dispatch]);

  function handleClick(chatId) {
    navigate(`/chats/${chatId}`);
  }

  return (
    <div className={style.messages}>
      <h3>Conversaciones</h3>
      {chats.map((chat) => {
        if (chat.user1Id === userId || chat.user2Id === userId) {
          const otherUserId =
            chat.user1Id === userId ? chat.user2Id : chat.user1Id;
          const otherUser = allUsers.find((user) => user.id === otherUserId);

          if (otherUser) {
            return (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                key={chat.id}
                onClick={() => handleClick(chat.id)}
                className={style.list}
              >
                <img src={otherUser.image} alt={otherUser.username} />
                <h4>{otherUser.username}</h4>
              </motion.div>
            );
          }
        }
        return null; // Manejar el caso en el que no se encuentra el usuario
      })}
    </div>
  );
};

export default Messages;
