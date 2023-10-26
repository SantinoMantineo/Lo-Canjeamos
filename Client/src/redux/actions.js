import axios from "axios";
import {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_ALL_POSTS,
  GET_POST_BY_ID,
  GET_POST_BY_CATEGORY,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} from "./actionTypes";

export function getAllUsers() {
  return async function (dispatch) {
    const response = await axios("http://localhost:3001/users");
    return dispatch({
      type: GET_ALL_USERS,
      payload: response.data,
    });
  };
}

export function getUserById(id) {
    return async function(dispatch) {
        const response = await axios(`http://localhost:3001/users/${id}`)
        return dispatch({
            type: GET_USER_BY_ID,
            payload: response.data
        })
    }
} 

export function createUser(user) {
  return async (dispatch) => {
    const result = await axios.post(
      "http://localhost:3001/users/addUser",
      user
    );
    dispatch({
      type: CREATE_USER,
      payload: result.data,
    });
  };
}

export function updateUser(id, user) {
  return async (dispatch) => {
    const result = await axios.put(
        `http://localhost:3001/users/${id}`,
      user
    );
    dispatch({
      type: UPDATE_USER,
      payload: result.data,
    });
  };
}

export function deleteUser(id) {
    return async (dispatch) => {
      const result = await axios.delete(
        `http://localhost:3001/users/${id}`
      );
      dispatch({
        type: DELETE_USER,
        payload: result.data,
      });
    };
  }

  export function getAllPosts() {
    return async function (dispatch) {
      const response = await axios("http://localhost:3001/posts");
      return dispatch({
        type: GET_ALL_POSTS,
        payload: response.data,
      });
    };
  }

  export function getPostById(id) {
    return async function(dispatch) {
        const response = await axios(`http://localhost:3001/posts/${id}`)
        return dispatch({
            type: GET_POST_BY_ID,
            payload: response.data
        })
    }
} 

  export function getPostByCategory(category) {
    return async function (dispatch) {
      const response = await axios(`http://localhost:3001/posts/categories/${category}`);
      return dispatch({
        type: GET_POST_BY_CATEGORY,
        payload: response.data,
      });
    };
  }
  
  export function createPost(post) {
    return async (dispatch) => {
      const result = await axios.post(
        "http://localhost:3001/posts",
        post
      );
      dispatch({
        type: CREATE_POST,
        payload: result.data,
      });
    };
  }
  
  export function updatePost(id, post) {
    return async (dispatch) => {
      const result = await axios.put(
          `http://localhost:3001/posts/${id}`,
        post
      );
      dispatch({
        type: UPDATE_POST,
        payload: result.data,
      });
    };
  }
  
  export function deletePost(id) {
      return async (dispatch) => {
        const result = await axios.delete(
          `http://localhost:3001/posts/${id}`
        );
        dispatch({
          type: DELETE_POST,
          payload: result.data,
        });
      };
    }
