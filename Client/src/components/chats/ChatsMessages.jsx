import io from "socket.io-client";
import axios from "axios";

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createMessage,
  getAllChats,
  getAllUsers,
  saveOtherUserData,
} from "../../redux/actions";

import style from "./ChatsMessages.module.css";

const ChatsMessages = ({ chatId, userData }) => {
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const senderId = userData.id;
  const userId = userData.id;

 /*   const socketServer = io("http://localhost:3001/", {
    query: { chatId },
  }); */

  const socketServer = io("https://lo-canjeamos-production.up.railway.app/", {
    query: { chatId },
  });

  const chats = useSelector((state) => state.chats);
  const allUsers = useSelector((state) => state.allUsers);
  const otherUsername = useSelector((state) => state.otherUserName);
  const otherUserImage = useSelector((state) => state.otherUserImage);

  const [newMessage, setNewMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  //Traer historial de mensajes de la base de datos y cargarla en el estado local
  useEffect(() => {
    const fetchMessageHistory = async () => {
      try {
        const response = await axios(`/messages/${chatId}`);
        setMessageHistory(response.data);
      } catch (error) {
        console.error("Error fetching message history:", error);
      }
    };
    fetchMessageHistory();
  }, [chatId]);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  //Mandar info al servidor y guardar mensaje en base de datos
  const sendMessage = async () => {
    if (!newMessage.trim()) {
      return;
    }

    const messageData = {
      userId: senderId,
      chatId: chatId,
      content: newMessage,
    };
    socketServer.emit("chat message", messageData);
    await dispatch(createMessage(chatId, userId, newMessage));
    setNewMessage("");
    messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Recibir info del servidor
  useEffect(() => {
    socketServer.emit("joinRoom", chatId);

    socketServer.on("chat message", (messageData) => {
      const { userId, chatId: receivedChatId, content } = messageData;

      if (receivedChatId === chatId) {
        const position = userId == senderId ? "myMessage" : "otherMessage";
        setMessageHistory((prevMessages) => [
          ...prevMessages,
          { content, position, userId },
        ]);
        setTimeout(() => {
          messagesEndRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }, 100); // Puedes ajustar el tiempo según sea necesario
      }
    });
    return () => {
      socketServer.off("chat message");
    };
  }, [chatId]);

  //Rellenar lista de usuarios
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllChats());
  }, [dispatch]);


  useEffect(() => {
    if (chats.length > 0) {
      window.scrollTo(0, document.body.scrollHeight);
      // Realiza la búsqueda del username del otro usuario en allUsers
      const chat = chats.find((chat) => chat.id == chatId);
      let otherUserId;
      if (senderId == chat.user1Id) {
        otherUserId = chat.user2Id;
      } else if (senderId != chat.user1Id) {
        otherUserId = chat.user1Id;
      }

      if (otherUserId) {
        const otherUser = allUsers.find((user) => user.id === otherUserId);
        if (otherUser) {
          const otherUserName = otherUser.username;
          const otherUserImage = otherUser.image;
          dispatch(saveOtherUserData(otherUserName, otherUserImage));
        }
      }
    }
  }, [chats, chatId, allUsers]);

  return (
    <div className={style.chat}>
      <div className={style.user}>
        <img src={otherUserImage} className={style.avatar}></img>
        <h3>{otherUsername}</h3>
      </div>

      <ul className={style.listMsg} ref={messagesEndRef}>
        {messageHistory.map((msg, index) => (
          <li key={index}>
            <div className={style.messageWreapper}>
              {msg.userId !== senderId && (
                <div className={style.otherUserLabel}>
                  <p>{otherUsername}</p>
                </div>
              )}
              <div
                className={
                  msg.userId === senderId ? style.myMessage : style.otherMessage
                }
              >
                {msg.userId === senderId && (
                  <div className={style.myUserLabel}>
                    <p>Yo</p>
                  </div>
                )}
                <h5>{msg.content}</h5>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className={style.input}>
        <input
          type="text"
          value={newMessage}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
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
