import React from 'react';
import { useSelector } from 'react-redux';

const LikedPublications = () => {
  // Obtén la lista de IDs de publicaciones que te gustan desde el estado de Redux.
  const likedPosts = useSelector((state) => state.likedPosts);


  return (
    <div>
      <h2>Publicaciones que te gustan:</h2>
      <ul>
        {likedPosts.map((postId) => (
          <li key={postId}>
            {/* Aquí debes mostrar la información de la publicación correspondiente
                usando el ID de la publicación (postId) */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LikedPublications;