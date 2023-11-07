import axios from "axios";
import {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  CARGAR_HISTORIAL_MENSAJES,
  ADD_MESSAGE_TO_HISTORY,
  GET_ALL_MESSAGES,
  GET_ALL_CHATS,
  GET_ALL_POSTS,
  GET_POST_BY_ID,
  SELECT_CATEGORY,
  SELECT_LOCALITY,
  SELECT_PROVINCE,
  GET_POST_BY_CATEGORY,
  GET_POST_BY_PROVINCE,
  GET_POST_BY_LOCALITY,
  LIKE_POST,
  GET_MATCHES,
  UPDATE_FILTERED_MATCHES,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  SELECTED_POST,
  RESET_FILTERS,
} from "./actionTypes";

export function getAllUsers() {
  return async function (dispatch) {
    const response = await axios("/users/allUsers");
    return dispatch({
      type: GET_ALL_USERS,
      payload: response.data,
    });
  };
}

export function getUserById(id) {
  return async function (dispatch) {
    const response = await axios(`/users/${id}`);
    return dispatch({
      type: GET_USER_BY_ID,
      payload: response.data,
    });
  };
}

export function createGoogleUser(user) {
  //*
  console.log("actions entrega", user);
  return async (dispatch) => {
    const result = await axios.post("/users/registerGoogle", user);
    dispatch({
      type: CREATE_USER,
      payload: result.data,
    });
  };
}

export function createUser(user) {
  return async (dispatch) => {
    const result = await axios.post("/users/register", user);
    dispatch({
      type: CREATE_USER,
      payload: result.data,
    });
  };
}

export function updateUser(id, user) {
  return async (dispatch) => {
    const result = await axios.put(`/users/${id}`, user);
    dispatch({
      type: UPDATE_USER,
      payload: result.data,
    });
  };
}

export function deleteUser(id) {
  return async (dispatch) => {
    const result = await axios.delete(`/users/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: result.data,
    });
  };
}

export function getAllPosts() {
  return async function (dispatch) {
    const response = await axios("/posts");
    return dispatch({
      type: GET_ALL_POSTS,
      payload: response.data,
    });
  };
}

export function getPostById(id) {
  return async function (dispatch) {
    const response = await axios(`/posts/${id}`);
    return dispatch({
      type: GET_POST_BY_ID,
      payload: response.data,
    });
  };
}

export const likePost = (myUserId, likedPostId, myPostId, anotherUserId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/likes", {
        myUserId: myUserId,
        likedPostId: likedPostId,
        myPostId: myPostId,
        anotherUserId: anotherUserId,
      });
      const likedPost = response.data;
      dispatch({
        type: LIKE_POST,
        payload: {
          myUserId: myUserId,
          likedPostId: likedPostId,
          myPostId: myPostId,
          anotherUserId: anotherUserId,
        },
      });
    } catch (error) {
      console.error("Error al dar like a la publicación", error);
    }
  };
};

export const getMatches = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/matches/${userId}`);
      const matches = response.data;
      dispatch({ type: GET_MATCHES, payload: matches });
    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje de error en la interfaz de usuario
      console.error("Error al obtener los matches", error);
    }
  };
};

export const updateMatchedPairs = (matchedPairs) => {
  return {
    type: UPDATE_FILTERED_MATCHES,
    payload: matchedPairs,
  };
};

export const selectedPost = (postId, postImage) => {
  return {
    type: SELECTED_POST,
    payload: {
      id: postId,
      image: postImage,
    },
  };
};

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    payload: category,
  };
}

export function selectProvince(provincia) {
  return {
    type: SELECT_PROVINCE,
    payload: provincia,
  };
}

export function selectLocality(localidad) {
  return {
    type: SELECT_LOCALITY,
    payload: localidad,
  };
}

export function getPostByCategory(category) {
  return async function (dispatch) {
    const response = await axios(`/posts/categories/${category}`);
    return dispatch({
      type: GET_POST_BY_CATEGORY,
      payload: response.data,
    });
  };
}

export function getPostByProvince(provincia) {
  return async function (dispatch) {
    const response = await axios(`/posts/provincia/${provincia}`);
    return dispatch({
      type: GET_POST_BY_PROVINCE,
      payload: response.data,
    });
  };
}

export function getPostByLocality(localidad) {
  return async function (dispatch) {
    const response = await axios(`/posts/localidad/${localidad}`);
    return dispatch({
      type: GET_POST_BY_LOCALITY,
      payload: response.data,
    });
  };
}

export function updatePost(id, post) {
  return async (dispatch) => {
    const result = await axios.put(`/posts/${id}`, post);
    dispatch({
      type: UPDATE_POST,
      payload: result.data,
    });
  };
}

export function deletePost(id) {
  return async (dispatch) => {
    const result = await axios.delete(`/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: result.data,
    });
  };
}
export function resetFilters() {
  return {
    type: RESET_FILTERS,
  };
}

export function messagesHistory(chatId) {
  return async (dispatch) => {
    try {
      // Realiza una solicitud al servidor para obtener el historial de mensajes
      const response = await axios.get(`/messages/${chatId}`);

      dispatch({
        type: CARGAR_HISTORIAL_MENSAJES,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al cargar el historial de mensajes:", error);
    }
  };
}

export function sendAndCreateMessage(chatId, senderId, content) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/messages/${chatId}`, {
        senderId,
        content,
      });

      // Si la creación y el guardado del mensaje son exitosos, puedes realizar otras acciones aquí si es necesario.

      return response.data; // Puedes retornar el mensaje creado si lo necesitas en tu aplicación.
    } catch (error) {
      console.error("Error al crear y guardar el mensaje:", error);
      throw error;
    }
  };
}

export function addMessageToHistory(newMessage) {
  return {
    type: ADD_MESSAGE_TO_HISTORY,
    payload: newMessage,
  };
}

//CREAR CHAT
export function createChat(userId, anotherUserId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/chats/create", {
        userId,
        anotherUserId,
      });
      const chatData = response.data; // Obtén los datos del chat recién creado
      resolve(chatData); // Resuelve la promesa con los datos del chat
    } catch (error) {
      console.error("Error al crear el chat:", error);
      reject(error); // Rechaza la promesa en caso de error
    }
  });
}

export function getAllChats() {
  return async function (dispatch) {
    const response = await axios("/chats/allChats");
    return dispatch({
      type: GET_ALL_CHATS,
      payload: response.data,
    });
  };
}

export function getAllMessages() {
  return async function (dispatch) {
    const response = await axios("/messages/allMessages");
    return dispatch({
      type: GET_ALL_MESSAGES,
      payload: response.data,
    });
  };
}

export function createPost(post) {
  return async (dispatch) => {
    const result = await axios.post("/posts", post);
    dispatch({
      type: CREATE_POST,
      payload: result.data,
    });
  };
}
