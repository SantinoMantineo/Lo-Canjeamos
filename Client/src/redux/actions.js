import axios from "axios";
import {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_ALL_POSTS,
  GET_POST_BY_ID,
  SELECT_CATEGORY,
  SELECT_LOCALITY,
  SELECT_PROVINCE,
  GET_POST_BY_CATEGORY,
  GET_POST_BY_PROVINCE,
  GET_POST_BY_LOCALITY,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  RESET_FILTERS
} from "./actionTypes";

export function getAllUsers() {
  return async function (dispatch) {
    const response = await axios("/users");
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

export function createUser(user) {
  return async (dispatch) => {
    const result = await axios.post(
      "/users/register",
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
    const response = await axios(
      `/posts/categories/${category}`
    );
    return dispatch({
      type: GET_POST_BY_CATEGORY,
      payload: response.data,
    });
  };
}

export function getPostByProvince(provincia) {
  return async function (dispatch) {
    const response = await axios(
      `/posts/provincia/${provincia}`
    );
    return dispatch({
      type: GET_POST_BY_PROVINCE,
      payload: response.data,
    });
  };
}

export function getPostByLocality(localidad) {
  return async function (dispatch) {
    const response = await axios(
      `/posts/localidad/${localidad}`
    );
    return dispatch({
      type: GET_POST_BY_LOCALITY,
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
