import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  messagesHistory,
  sendAndCreateMessage,
  addMessageToHistory,
  getAllUsers,
} from "../../redux/actions";
import { socketServer } from "../../App";
import avatar from "../../assets/avatar.jpg";
import style from "./ChatsMessages.module.css";
import { useAuth0 } from "@auth0/auth0-react";

const ChatsMessages = ({ chatId, userData }) => {
  const dispatch = useDispatch();
  const senderId = userData.id;
  const messageHistory = useSelector((state) => state.messageHistory);
  const [newMessage, setNewMessage] = useState(""); // Estado para almacenar el mensaje a enviar
  const allUsers = useSelector((state) => state.allUsers);
  const [otherUsername, setOtherUsername] = useState(""); // Estado para almacenar el username del otro usuario

  const [otherUserImage, setOtherUserImage] = useState(""); //Estado para almacenar image del otro usuario

  const [counter, setCounter] = useState(0);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const sendMessage = () => {
    dispatch(sendAndCreateMessage(chatId, senderId, newMessage))
      .then((newMessage) => {
        console.log("Mensaje creado:", newMessage);
      })
      .catch((error) => {
        console.error("Error al crear y guardar el mensaje:", error);
        throw error;
      });

    setNewMessage("");
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(messagesHistory(chatId));

    return () => {};
  }, [counter]);

  useEffect(() => {
    // Este efecto se ejecutará cuando cambie 'chatId'
    socketServer.on("live-message", (newMessage) => {
      if (newMessage.chatId === chatId) {
        dispatch(addMessageToHistory(newMessage));
      }
    });

    socketServer.emit("message-to-server", "Hi, server!");

    return () => {
      // Realiza alguna limpieza si es necesario cuando se desmonta el componente o cuando cambian las dependencias
      socketServer.disconnect();
    };
  }, [chatId]);

  //dispatch, chatId, senderId, messageHistory, allUsers

  // Buscar el username del otro usuario en allUsers
  useEffect(() => {
    // Buscar el username del otro usuario en allUsers cuando cambie messageHistory
    const otherUserId = messageHistory.find(
      (message) => message.senderId !== senderId
    )?.senderId;

    if (otherUserId) {
      const otherUser = allUsers.find((user) => user.id === otherUserId);
      if (otherUser) {
        setOtherUsername(otherUser.username);
        setOtherUserImage(otherUser.image);
      }
    } else {
      // Si no se encuentra otro usuario, puedes establecer un valor predeterminado o manejarlo de otra manera apropiada.
      setOtherUsername("Usuario Desconocido");
    }
  }, [messageHistory, senderId, allUsers]);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end", // Esto hace que el scroll sea hacia arriba
    });
  }, [messageHistory]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={style.chat}>
      <div className={style.user}>
        <img src={otherUserImage} className={style.avatar}></img>
        <h3>{otherUsername}</h3>
      </div>

      <ul className={style.listMsg} ref={messagesEndRef}>
        {messageHistory.map((message) => (
          <li key={message.id}>
            <div className={style.messageWrapper}>
              {message.senderId !== senderId && (
                <div className={style.otherUserLabel}>
                  <p>{otherUsername}</p>
                </div>
              )}
              <div
                className={
                  message.senderId === senderId
                    ? style.myMessage
                    : style.otherMessage
                }
              >
                {message.senderId === senderId && (
                  <div className={style.myUserLabel}>
                    <p>Yo</p>
                  </div>
                )}
                <h5>{message.content}</h5>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className={style.input}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={sendMessage} className={style.sendMessage}>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/fluency-systems-regular/48/sent--v1.png"
            alt="sent--v1"
          />
        </button>
      </div>
    </div>
  );
};

export default ChatsMessages;
