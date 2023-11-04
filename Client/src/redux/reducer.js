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
  RESET_FILTERS,
  CARGAR_HISTORIAL_MENSAJES,
  ADD_MESSAGE_TO_HISTORY,
  GET_ALL_MESSAGES,
  GET_ALL_CHATS,
  GET_MATCHES,
  SELECTED_POST,
} from "./actionTypes";

const initialState = {
  allUsers: [],
  selectedUser: "",
  allPosts: [],
  allPostsCopy: [],
  selectedPost: "",
  selectedProvince: "",
  selectedLocality: "",
  selectedCategory: "",
  selectedPostToInteract: "",
  selectedPostImage: "",
  matches: [],
  messageHistory: [],
  chats: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };

    case GET_USER_BY_ID:
      return {
        ...state,
        selectedUser: action.payload,
      };

    case CREATE_USER:
      return {
        ...state,
        allUsers: [...state.allUsers, action.payload],
      };

    case UPDATE_USER:
      return {
        ...state,
        allUsers: state.allUsers.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter(
          (user) => user.id !== action.payload.id
        ),
      };

    case GET_ALL_POSTS:
      return {
        ...state,
        allPosts: action.payload,
        allPostsCopy: action.payload,
      };

    case GET_POST_BY_ID:
      return {
        ...state,
        selectedPost: action.payload,
      };

    case SELECT_PROVINCE:
      return {
        ...state,
        selectedProvince: action.payload,
        selectedLocality: "",
      };

    case SELECT_LOCALITY:
      return {
        ...state,
        selectedLocality: action.payload,
      };

    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case SELECTED_POST:
      return {
        ...state,
        selectedPostToInteract: action.payload.id,
        selectedPostImage: action.payload.image,
      };

    case GET_POST_BY_CATEGORY:
    case GET_POST_BY_PROVINCE:
    case GET_POST_BY_LOCALITY:
      let filteredPosts = state.allPostsCopy;

      if (state.selectedCategory) {
        filteredPosts = filteredPosts.filter(
          (post) => post.category === state.selectedCategory
        );
      }

      if (state.selectedProvince) {
        filteredPosts = filteredPosts.filter((post) =>
          post.ubication.includes(state.selectedProvince)
        );
      }

      if (state.selectedLocality) {
        filteredPosts = filteredPosts.filter((post) =>
          post.ubication.includes(state.selectedLocality)
        );
      }

      return {
        ...state,
        allPosts: filteredPosts,
      };

    case CREATE_POST:
      return {
        ...state,
        allPosts: [...state.allPosts, action.payload],
      };

    case UPDATE_POST:
      return {
        ...state,
        allPosts: state.allPosts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };

    case DELETE_POST:
      return {
        ...state,
        allPosts: state.allPosts.filter(
          (post) => post.id !== action.payload.id
        ),
      };

    case GET_MATCHES:
      return {
        ...state,
        matches: action.payload,
      };

    case CARGAR_HISTORIAL_MENSAJES:
      return {
        ...state,
        messageHistory: action.payload,
      };

    case ADD_MESSAGE_TO_HISTORY:
      return {
        ...state,
        messageHistory: [...state.messageHistory, action.payload],
      };

      
      case GET_ALL_MESSAGES:
        return {
          ...state,
          messageHistory: action.payload,
        };
        
        case GET_ALL_CHATS:
          return {
            ...state,
            chats: action.payload,
          };

    case RESET_FILTERS:
      return {
        ...state,
        selectedCategory: "",
        selectedProvince: "",
        selectedLocality: "",
      };

    default:
      return state;
  }
}

export default rootReducer;
