import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  messagesHistory,
  sendAndCreateMessage,
  addMessageToHistory,
  getAllUsers,
} from "../../redux/actions";
import { socketServer } from "../../App";

const ChatsMessages = ({ chatId, userData }) => {
  const dispatch = useDispatch();
  const senderId = userData.id;
  const messageHistory = useSelector((state) => state.messageHistory);
  const [newMessage, setNewMessage] = useState(""); // Estado para almacenar el mensaje a enviar
  const allUsers = useSelector((state) => state.allUsers);
  const [otherUsername, setOtherUsername] = useState(""); // Estado para almacenar el username del otro usuario

  const [counter, setCounter] = useState(0);

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
  
    return () => {
    };
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
    }
  } else {
    // Si no se encuentra otro usuario, puedes establecer un valor predeterminado o manejarlo de otra manera apropiada.
    setOtherUsername("Usuario Desconocido");
  }
}, [messageHistory, senderId, allUsers]);

  return (
    <div>
      <h1>Historial de Chat</h1>

      <ul>
        {messageHistory.map((message) => (
          <li key={message.id}>
            {message.senderId === senderId ? (
              <strong>{userData.username}: </strong>
            ) : (
              <strong>{otherUsername}: </strong>
            )}
            {message.content}
          </li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatsMessages;
