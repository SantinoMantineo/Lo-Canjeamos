import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPosts,
  getMatches,
  createChat,
  getAllChats,
  updateMatchedPairs,
} from "../../redux/actions";

import style from "./Matchs.module.css";

const Matchs = ({ userData }) => {
  const [loading, setLoading] = useState(true);
  const matches = useSelector((state) => state.matches);
  const chats = useSelector((state) => state.chats);
  const allPosts = useSelector((state) => state.allPostsCopy);
  const userId = userData.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMatches(userId));
    dispatch(getAllPosts()).then(() => setLoading(false));
  }, [dispatch]);

  const filteredMatches = matches.filter((match) => {
    return match.match.some((m) => m.myUserId === userId);
  });

  const myPosts = allPosts.filter((post) => {
    return filteredMatches.some((match) => {
      return match.match.some(
        (m) => m.myUserId === userId && m.myPostId === post.id
      );
    });
  });

  const anotherUserPosts = allPosts.filter((post) => {
    return filteredMatches.some((match) => {
      return match.match.some(
        (m) => m.anotherUserId !== userId && m.likedPostId === post.id
      );
    });
  });

  const matchedPairs = myPosts.flatMap((myPost) => {
    const matchingPairs = [];
    const matchedPostIds = new Set();
    filteredMatches.forEach((match) => {
      match.match.forEach((m) => {
        if (
          m.myUserId !== userId &&
          (m.myPostId === myPost.id || m.likedPostId === myPost.id)
          ) {
            if (!matchedPostIds.has(m.myPostId)) {
              matchedPostIds.add(m.myPostId);
            matchingPairs.push({
              myPost,
              anotherUserPost: allPosts.find((post) => post.id === m.myPostId),
              anotherUserId: m.myUserId,
            });
          }
        }
      });
    });
    return matchingPairs;
  });
  
  useEffect(() => {
    // Al detectar nuevos matches, crea el chat automáticamente
    const newChatPairs = [];
    matchedPairs.forEach((pair) => {
      const existingChat = chats.find((chat) => {
        return (
          (chat.user1Id === userId && chat.user2Id === pair.anotherUserId) ||
          (chat.user1Id === pair.anotherUserId && chat.user2Id === userId)
        );
      });
  
      // Si no hay un chat existente, acumula la pareja para crear uno nuevo
      if (!existingChat) {
        newChatPairs.push(pair);
      }
    });
  
    console.log("matchedPairs:", matchedPairs);
    console.log("newChatPairs:", newChatPairs);
  
    // Crea los chats automáticamente para las parejas acumuladas
    newChatPairs.forEach((pair) => {
      dispatch(createChat(userId, pair.anotherUserId));
    });
  }, [dispatch]);
  

  function handleGoChat(anotherUserId) {
    const existingChat = chats.find((chat) => {
      return (
        (chat.user1Id === userId && chat.user2Id === anotherUserId) ||
        (chat.user1Id === anotherUserId && chat.user2Id === userId)
      );
    });

    if (existingChat) {
      navigate(`/chats/${existingChat.id}`);
    } else {
      console.error("Error: No se debería llegar aquí. La creación de chats debería manejarse automáticamente.");
    }
  }

  return (
    <div className={style.container}>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        matchedPairs.map((pair, index) => (
          <div key={index} className={style.matchs}>
            <div className={style.match}>
              <img
                className={style.img}
                src={pair.myPost.image[0]}
                alt={`My Post ${pair.myPost.id}`}
              />
            </div>

            {pair.anotherUserPost && (
              <div className={style.matchItem}>
                <img
                  className={style.img}
                  src={pair.anotherUserPost.image[0]}
                  alt={`Matched User Post ${pair.anotherUserPost.id}`}
                />
              </div>
            )}
            <button
              onClick={() => handleGoChat(pair.anotherUserPost.UserId)}
              className={style.goChats}
            >
              Chat
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Matchs;
