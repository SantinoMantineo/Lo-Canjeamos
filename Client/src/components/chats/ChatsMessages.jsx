import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  messagesHistory,
  sendAndCreateMessage,
  addMessageToHistory,
  getAllUsers,
  getAllChats,
} from "../../redux/actions";
import { socketServer } from "../../App";
import style from "./ChatsMessages.module.css";

const ChatsMessages = ({ chatId, userData }) => {
  const dispatch = useDispatch();
  const senderId = userData.id;
  const messageHistory = useSelector((state) => state.messageHistory);
  const chats = useSelector((state) => state.chats)
  const allUsers = useSelector((state) => state.allUsers);

  const [newMessage, setNewMessage] = useState("");
  const [otherUsername, setOtherUsername] = useState("");
  const [otherUserImage, setOtherUserImage] = useState("");
  const [counter, setCounter] = useState(0);
  const [hasNewMessage, setHasNewMessage] = useState(false);

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
      socketServer.emit("new-message", newMessage);
      setHasNewMessage(true); // Indica que se ha agregado un nuevo mensaje
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
    socketServer.on("new-message", (newMessage) => {
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
    if (chats.length > 0) {
      window.scrollTo(0, document.body.scrollHeight);
      // Realiza la búsqueda del username del otro usuario en allUsers
      const chat = chats.find((chat) => chat.id == chatId);
      let otherUserId
      if (senderId == chat.user1Id){
        otherUserId = chat.user2Id;
      }else if (senderId != chat.user1Id){
        otherUserId = chat.user1Id
      }

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
    }
  }, [chats, chatId, allUsers]);

useEffect(() => {
  if (hasNewMessage) {
    
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      
    });

    // Reinicia el estado después de desplazar el scroll
    setHasNewMessage(false);
  }
}, [hasNewMessage]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

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
          onKeyDown={handleKeyDown}
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

export default ChatsMessages