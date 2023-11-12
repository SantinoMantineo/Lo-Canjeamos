import { useParams } from "react-router-dom";
import ChatsMessages from "../../components/chats/ChatsMessages";
import style from "./Chats.module.css";

const Chats = ({ userData }) => {
  const { chatId } = useParams();

  return (
    <>
      <div className={style.chats}>
   
        <div className={style.chatsMsg}>
          <ChatsMessages chatId={chatId} userData={userData}></ChatsMessages>
        </div>
      </div>
    </>
  );
};

export default Chats;
