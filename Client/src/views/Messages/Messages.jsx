import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChats, getAllUsers } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

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
    <div>
      {chats.map((chat) => {
        if (chat.user1Id === userId || chat.user2Id === userId) {
          const otherUserId = chat.user1Id === userId ? chat.user2Id : chat.user1Id;
          const otherUser = allUsers.find((user) => user.id === otherUserId);

          if (otherUser) {
            return (
              <div key={chat.id} onClick={() => handleClick(chat.id)}>
                <h2>Usuario: {otherUser.username}</h2>
                <img src={otherUser.image} alt={otherUser.username} />
              </div>
            );
          }
        }
        return null; // Manejar el caso en el que no se encuentra el usuario
      })}
    </div>
  );
};

export default Messages;
