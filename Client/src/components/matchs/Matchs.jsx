import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/favicon.png";
import style from "./Matchs.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts, getMatches } from "../../redux/actions";

const Matchs = ({ userData }) => {
  const matches = useSelector((state) => state.matches);
  const allPosts = useSelector((state) => state.allPostsCopy);
  const dispatch = useDispatch();
  const userId = userData.id;

  if (matches != 0) {
    console.log("Todos los matches: ", matches);
  }

  useEffect(() => {
    dispatch(getMatches(userId));
    dispatch(getAllPosts());
  }, [dispatch]);

  const filteredMatches = matches.filter((match) => {
    return match.match.some((m) => m.myUserId === userId);
  });

  if (filteredMatches != 0) {
    console.log("Mis matches: ", filteredMatches);
  }

  const myPosts = allPosts.filter((post) => {
    return filteredMatches.some((match) => {
      return match.match.some(
        (m) => m.myUserId === userId && m.myPostId === post.id
      );
    });
  });

  if (myPosts != 0) {
    console.log("Mis posts: ", myPosts);
  }

  // Filtra los posts cuyo id coincide con "anotherUserId" de los objetos en filteredMatches
  const anotherUserPosts = allPosts.filter((post) => {
    return filteredMatches.some((match) => {
      return match.match.some(
        (m) => m.anotherUserId != userId && m.likedPostId === post.id
      );
    });
  });

  if (anotherUserPosts != 0) {
    console.log("Posts del otro: ", anotherUserPosts);
  }

  const matchedPairs = myPosts.flatMap((myPost) => {
    const matchingPairs = filteredMatches
      .filter((match) => {
        return match.match.some(
          (m) =>
            m.myUserId === userId &&
            (m.myPostId === myPost.id || m.likedPostId === myPost.id)
        );
      })
      .map((match) => {
        const matchingPost = match.match.find(
          (m) =>
            m.anotherUserId !== userId &&
            (m.myPostId === myPost.id || m.likedPostId === myPost.id)
        );
        return {
          myPost,
          anotherUserPost: matchingPost
            ? allPosts.find((post) => post.id === matchingPost.anotherUserId)
            : null,
        };
      });

    return matchingPairs;
  });

  console.log("matches a renderizar: ", matchedPairs);

  return (
    <div>
      {matchedPairs.map((pair, index) => (
        <div key={index} className={style.matchs}>
          <div className={style.match}>
            <img
              className={style.img}
              src={pair.myPost.image[0]}
              alt={`My Post ${pair.myPost.id}`}
            />
            {/* Otros detalles de tu post */}
          </div>
          <div>
            <img className={style.matchLogo} src={Logo} alt="logo" />
          </div>
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
      ))}
    </div>
  );
};

export default Matchs;
