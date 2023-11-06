import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/favicon.png";
import style from "./Matchs.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPosts,
  getMatches,
  createChat,
  getAllChats,
  updateMatchedPairs,
} from "../../redux/actions";

const Matchs = ({ userData }) => {
  const [loading, setLoading] = useState(true);

  const matches = useSelector((state) => state.matches);
  const chats = useSelector((state) => state.chats);
  const allPosts = useSelector((state) => state.allPostsCopy);
  const matchedPair = useSelector((state) => state.matches.matchedPairs); // Accede a filteredMatches desde el estado global
  console.log(matchedPair);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  //console.log("Chats: ", chats);

  const userId = userData.id;

  /* if (matches != 0) {
    console.log("Todos los matches: ", matches);
  }  */

  useEffect(() => {
    dispatch(getMatches(userId));
    dispatch(getAllPosts()).then(() => setLoading(false));
  }, [dispatch]);

  const filteredMatches = matches.filter((match) => {
    return match.match.some((m) => m.myUserId === userId);
  });

 /*   if (filteredMatches != 0) {
    console.log("Mis matches: ", filteredMatches);
  } */

  const myPosts = allPosts.filter((post) => {
    return filteredMatches.some((match) => {
      return match.match.some(
        (m) => m.myUserId === userId && m.myPostId === post.id
      );
    });
  });

  /*  if (myPosts != 0) {
    console.log("Mis posts: ", myPosts);
  }
 */

  // Filtra los posts cuyo id coincide con "anotherUserId" de los objetos en filteredMatches
  const anotherUserPosts = allPosts.filter((post) => {
    return filteredMatches.some((match) => {
      return match.match.some(
        (m) => m.anotherUserId != userId && m.likedPostId === post.id
      );
    });
  });

  /*  if (anotherUserPosts != 0) {
        console.log("Posts del otro: ", anotherUserPosts);
      } */

  const matchedPairs = myPosts.flatMap((myPost) => {
    const matchingPairs = [];

    // Creamos un conjunto para realizar un seguimiento de los IDs de los posts con los que ya hemos hecho match
    const matchedPostIds = new Set();

    filteredMatches.forEach((match) => {
      match.match.forEach((m) => {
        // Verificamos que el match sea con otro usuario y que el post coincida con el tuyo
        if (
          m.myUserId !== userId &&
          (m.myPostId === myPost.id || m.likedPostId === myPost.id)
        ) {
          // Verificamos que el post con el que hacemos match no se haya incluido previamente
          if (!matchedPostIds.has(m.myPostId)) {
            matchedPostIds.add(m.myPostId);
            matchingPairs.push({
              myPost,
              anotherUserPost: allPosts.find((post) => post.id === m.myPostId),
            });
          }
        }
      });
    });

    return matchingPairs;
  });

  useEffect(() => {
    dispatch(updateMatchedPairs(matchedPairs));
  }, [matchedPairs, dispatch]);
  console.log("matches a renderizar: ", matchedPairs);

  function handleStartChat(anotherUserId) {
    // Verifica si ya existe un chat entre los usuarios actual y anotherUserId
    const existingChat = chats.find((chat) => {
      return (
        (chat.user1Id === userId && chat.user2Id === anotherUserId) ||
        (chat.user1Id === anotherUserId && chat.user2Id === userId)
      );
    });

    if (existingChat) {
      // Redirige al usuario a la vista del chat existente
      navigate(`/chats/${existingChat.id}`);
    } else {
      // Si no existe un chat, crea uno
      createChat(userId, anotherUserId)
        .then((chat) => {
          // Accede al chatId desde el chat creado
          const chatId = chat.id;
          // Redirige al usuario a la vista del chat recién creado
          navigate(`/chats/${chatId}`);
        })
        .catch((error) => {
          console.error("Error al iniciar el chat:", error);
          // Puedes manejar el error de otra manera si es necesario
        });
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
              {/* Otros detalles de tu post */}
            </div>
            <button
              onClick={() => handleStartChat(pair.anotherUserPost.UserId)}
              className={style.goChats}
            >
              Ir al Chat
            </button>
            {pair.anotherUserPost && (
              <div className={style.matchItem}>
                <img
                  className={style.img}
                  src={pair.anotherUserPost.image[0]}
                  alt={`Matched User Post ${pair.anotherUserPost.id}`}
                />
                {/* Otros detalles del post del otro usuario */}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Matchs;
