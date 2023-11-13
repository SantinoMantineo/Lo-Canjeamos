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

const Matchs = ({ userData}) => {
  const [loading, setLoading] = useState(true);
  const matches = useSelector((state) => state.matches);
  const chats = useSelector((state) => state.chats);
  console.log(chats);
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
            const anotherUserPost = allPosts.find((post) => post.id === m.myPostId);
  
            // Verificar si anotherUserPost no es undefined antes de agregar a matchingPairs
            if (anotherUserPost !== undefined) {
              matchingPairs.push({
                myPost,
                anotherUserPost,
                anotherUserId: m.myUserId,
              });
            }
          }
        }
      });
    });
    return matchingPairs;
  });
  

  useEffect(() => {
    dispatch(updateMatchedPairs(matchedPairs))
  })
  
  useEffect(() => {
    const createChatsForPairs = async () => {
      // Al detectar nuevos matches, crea el chat automáticamente
      const newChatPairs = [];
    
      for (const pair of matchedPairs) {
        const existingChat = chats.find((chat) => {
          return (
            (chat.user1Id === userId && chat.user2Id === pair.anotherUserId) ||
            (chat.user1Id === pair.anotherUserId && chat.user2Id === userId)
          );
        });
    
        // Si no hay un chat existente, acumula la pareja para crear uno nuevo
        if (!existingChat) {
          newChatPairs.push(pair);
          // Espera a que se cree el chat antes de continuar
          await dispatch(createChat(userId, pair.anotherUserId));
        }
      };
    
      // ...resto del código
    };
    
    
  
    createChatsForPairs();
  }, [loading]);
  


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
      console.error(
        "Error: No se debería llegar aquí. La creación de chats debería manejarse automáticamente."
      );
    }
  }

  function handleGoProfile(anotherUserId) {
      navigate(`/UserProfile/${anotherUserId}`);
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
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/fluency-systems-regular/48/chat--v1.png"
                alt="Chat"
              />
            </button>
            <button
              onClick={() => handleGoProfile(pair.anotherUserPost.UserId)}
              className={style.goChats}
            >
              <img
              width="24"
              height="24"
              src="https://img.icons8.com/puffy/32/experimental-user-puffy.png"
              alt="Usuario"
            />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Matchs;
