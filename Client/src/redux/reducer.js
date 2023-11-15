import {
  GET_ALL_USERS,
  GET_ALL_DISABLED_USERS,
  GET_ALL_EXISTING_USERS,
  GET_USER_BY_ID,
  SORT_USER_BY_PLAN,
  SORT_USER_BY_STATUS,
  SORT_USER_BY_ID,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  RESTORE_USER,
  RESET_USERS_FILTER,
  GET_ALL_POSTS,
  GET_ALL_DISABLED_POSTS,
  GET_ALL_EXISTING_POSTS,
  SORT_POSTS_BY_ID,
  SORT_POSTS_BY_STATUS,
  RESET_POSTS_FILTER,
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
  RESTORE_POST,
  RESET_FILTERS,
  CARGAR_HISTORIAL_MENSAJES,
  OTHER_USER_DATA,
  GET_ALL_MESSAGES,
  GET_ALL_CHATS,
  DELETE_LIKE,
  CHAT_CREATED,
  GET_MATCHES,
  UPDATE_FILTERED_MATCHES,
  LIKED_POSTS,
  GET_ALL_LIKES,
  SELECTED_POST,
  CLEAR_DETAIL,
} from "./actionTypes";

const initialState = {
  allUsers: [],
  allExistingUsers: [],
  allExistingUsersCopy: [],
  allDisabledUsers: [],
  otherUserName: "",
  otherUserImage: "",
  selectedUser: "",
  allPosts: [],
  allPostsCopy: [],
  allDisabledPosts: [],
  allExistingPosts: [],
  allExistingPostsCopy: [],
  selectedPost: "",
  selectedProvince: "",
  selectedLocality: "",
  selectedCategory: "",
  selectedPostToInteract: "",
  selectedPostImage: "",
  matches: [],
  allLikes: [],
  likedPosts: [],
  messageHistory: [],
  chats: [],
  interacciones: {},
  matchedPairs: [],
  postDetail:[],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
        allUsersCopy: action.payload,
      };

    case GET_ALL_DISABLED_USERS:
      return {
        ...state,
        allDisabledUsers: action.payload,
      };

    case GET_ALL_EXISTING_USERS:
      return {
        ...state,
        allExistingUsers: action.payload,
        allExistingUsersCopy: action.payload,
      };

    case GET_USER_BY_ID:
      return {
        ...state,
        selectedUser: action.payload,
      };

      case SORT_USER_BY_ID: {
        let ordered;

      if (action.payload === "Ascendente") {
        ordered = state.allExistingUsers.sort((a, b) =>
          a.id > b.id ? 1 : -1
        );
      } else {
        ordered = state.allExistingUsers.sort((a, b) =>
          b.id > a.id ? 1 : -1
        );
}
  
        return {
          ...state,
          allExistingUsers: [...ordered],
                  };
      }
  
      case SORT_USER_BY_PLAN: {
        let users = state.allExistingUsersCopy;
  
        if(action.payload === "Todos") {
        users = state.allExistingUsersCopy
      } else {
        users = state.allExistingUsersCopy.filter(
          (user) => user.plan === action.payload
        )
      }
  
        return {
          ...state,
          allExistingUsers: [...users]
        };
      }
  
      case SORT_USER_BY_STATUS: {
        let users = state.allExistingUsersCopy;
  
        if (action.payload === "Activos") {
        users = state.allExistingUsersCopy.filter(
          (user) => !user.Deshabilitado)
          } else if (action.payload === "Deshabilitados") {
        users = state.allExistingUsersCopy.filter(
          (user) => user.Deshabilitado)
            } else {
        users = state.allExistingUsersCopy
      }
  
        return {
          ...state,
          allExistingUsers: [...users]
        };
      }

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

    case RESTORE_USER: {
      const { id } = action.payload;
      const allUsers = [...state.allUsers];

      const insertIndex = allUsers.findIndex((user) => user.id > id);

      if (insertIndex === -1) {
        allUsers.push(action.payload);
      } else {
        if (insertIndex === 0) {
          allUsers.unshift(action.payload);
        } else {
          allUsers.splice(insertIndex, 0, action.payload);
        }
      }

      return {
        ...state,
        allUsers,
      };
    }

    case RESET_USERS_FILTER:
      return {
        ...state,
        allExistingUsers: state.allExistingUsersCopy
      }

      case GET_ALL_POSTS:
        // Aplicar los filtros directamente a action.payload
        let filteredAllPosts = action.payload;
      
        if (state.selectedCategory) {
          filteredAllPosts = filteredAllPosts.filter(
            (post) => post.category === state.selectedCategory
          );
        }
      
        if (state.selectedProvince) {
          filteredAllPosts = filteredAllPosts.filter((post) =>
            post.ubication.includes(state.selectedProvince)
          );
        }
      
        if (state.selectedLocality) {
          filteredAllPosts = filteredAllPosts.filter((post) =>
            post.ubication.includes(state.selectedLocality)
          );
        }
      
        return {
          ...state,
          allPosts: filteredAllPosts,
          allPostsCopy: action.payload,
        };

    case GET_ALL_DISABLED_POSTS:
      return {
        ...state,
        allDisabledPosts: action.payload,
      };


    case OTHER_USER_DATA:
      return {
        ...state,
        otherUserName: action.payload.otherUserName,
        otherUserImage: action.payload.otherUserImage
      }

    case GET_ALL_EXISTING_POSTS:
      return {
        ...state,
        allExistingPosts: action.payload,
        allExistingPostsCopy: action.payload,
      };


    case GET_POST_BY_ID:
      return {
        ...state,
        selectedPost: action.payload,
      };

    case SORT_POSTS_BY_ID: {
      let ordered;

      if (action.payload === "Ascendente") {
        ordered = state.allExistingPosts.sort((a, b) =>
            a.id > b.id ? 1 : -1
          );
      } else {
        ordered = state.allExistingPosts.sort((a, b) =>
            b.id > a.id ? 1 : -1
          );
      }

      return {
        ...state,
        allExistingPost: [...ordered],
      };
    }

    case SORT_POSTS_BY_STATUS: {
      let posts = state.allExistingPostsCopy;

      if (action.payload === "Activas") {
        posts = state.allExistingPostsCopy.filter(
          (post) => !post.Deshabilitado)
      } else if (action.payload === "Deshabilitadas") {
        posts = state.allExistingPostsCopy.filter(
            (post) => post.Deshabilitado)
      } else {
        posts = state.allExistingPostsCopy
      }

      return {
        ...state,
        allExistingPosts: [...posts]
      };
    }

    case RESET_POSTS_FILTER:
      return {
        ...state,
        allExistingPosts: state.allExistingPostsCopy
      }

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

    case RESTORE_POST: {
      const { id } = action.payload;
      const allPosts = [...state.allPosts];

      const insertIndex = allPosts.findIndex((user) => user.id > id);

      if (insertIndex === -1) {
        allPosts.push(action.payload);
      } else {
        if (insertIndex === 0) {
          allPosts.unshift(action.payload);
        } else {
          allPosts.splice(insertIndex, 0, action.payload);
        }
      }

      return {
        ...state,
        allPosts,
      };
    }

    case GET_ALL_LIKES:
      return {
        ...state,
        allLikes: action.payload,
      };

      case DELETE_LIKE:
        const deletedLikeId = action.payload.id;
  
        // Filtra los likes que deben eliminarse
        const updatedLikes = state.allLikes.filter((like) => like.likedPostId == deletedLikeId);
  
        // Filtra los matches que deben eliminarse
        const updatedMatches = state.matches.filter((match) =>
          match.some((like) => like.id !== deletedLikeId)
        );
  
        // Actualiza el estado con los likes y matches filtrados
        return {
          ...state,
          allLikes: updatedLikes,
          matches: updatedMatches,
        };
  

    case LIKED_POSTS:
      const userId = action.payload;
      const filteredLikes = state.allLikes.filter(
        (like) => like.myUserId === userId
      );
      const likedPostIds = filteredLikes.map((like) => like.likedPostId);
      const likedPosts = state.allPosts.filter((post) =>
        likedPostIds.includes(post.id)
      );
      return {
        ...state,
        likedPosts: likedPosts,
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        postDetail: [],
      };

    case GET_MATCHES:
      return {
        ...state,
        matches: action.payload,
      };

    case UPDATE_FILTERED_MATCHES:
      return {
        ...state,
        matchedPairs: action.payload,
      };

    case CARGAR_HISTORIAL_MENSAJES:
      return {
        ...state,
        messageHistory: action.payload,
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

    case CHAT_CREATED:
      return {
        ...state,
        chats: [
          ...state.chats,
          {
            id: action.payload.chatId.chatId,
            user1Id: action.payload.user1Id,
            user2Id: action.payload.user2Id
          },
        ],
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
