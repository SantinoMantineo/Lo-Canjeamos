import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getMatches,
    getPostById,
    likePost,
    clearDetail,
    getAllLikes,
  } from "../../redux/actions";

const ReviewForm = ({userData}) => {
    const myUserId = userData.id;
    const { id } = useParams();
    const likedPostId = id;
    console.log("like",likePost);
    const dispatch = useDispatch();
    const post = useSelector((state) => state.selectedPost);
    const anotherUserId = post.User?.id;
    console.log("anoteher",anotherUserId);
    const userName = post.User?.username;
    const myPostId = useSelector((state) => state.selectedPostToInteract);
  
    const allLikes = useSelector((state) => state.allLikes);
    const [liked, setLiked] = useState(false);
  
    const navigate = useNavigate();
  
    const filteredMatches = useSelector((state) => state.matches).filter(
      (match) => {
        return match.match.some(
          (m) => m.myPostId == myPostId && m.likedPostId == id
        );
      }
    );
  
    // Comprueba si likedPostId está en la lista de likedPosts
    const isPostLiked = allLikes.some(
      (like) => like.myPostId == myPostId && like.likedPostId == id
    );
  
    const isMatched = filteredMatches.length > 0;
  
    useEffect(() => {
      dispatch(getPostById(id));
    }, [id]);
  
    useEffect(() => {
      dispatch(getMatches());
      dispatch(getAllLikes());
    }, [dispatch]);
  
    useEffect(() => {
      dispatch(getPostById(`${id}`));
      return () => {
        dispatch(clearDetail());
      }; //limpia el detail
    }, []);
  
    
   
    const allPosts = useSelector((state) => state.allPosts);
    
  
   
    const handleGoBack = () => {
      window.history.back(); // Navega hacia atrás en el historial del navegador
    };
  
    return (
        <div>
            <h1>Review</h1>
        </div>
    )
}

export default ReviewForm;

// const [api, contextHolder] = notification.useNotification();
// const { userData } = useUser();

// const openNotificationWithIcon = (type, description) => {
//     api[type]({
//         message: description,
//         // description: "Stayfy",
//     });
// };

// const [review, setReview] = useState({
//     rating: 0,
//     title: '',
//     message: '',
//     userId: userData.userId,
//     bookId: idBook,
// });
// const dispatch = useDispatch();

// useEffect(() => {
//     Aos.init({ duration: 1500 });
// }, []);

// const handleRatingChange = (newRating) => {
//     setReview({ ...review, rating: newRating });
// };

// const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setReview({ ...review, [name]: value });
// };
// const [message, setMessage] = useState(null);
// const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('review.rating:', review.rating);
//     if (review.rating === 0) {
//         openNotificationWithIcon('warning', 'Selecciona una calificación.');
//         return;
//     }
//     try {
//         // console.log(review);
//         const response = await dispatch(postReview(review));

//         if (response && response.status === 201) {
//             openNotificationWithIcon('success', 'Review inserted successfully.');
//             setMessage('Reseña insertada correctamente.');
//         } else {
//             setMessage('Error al insertar la reseña. Inténtalo de nuevo.');
//             openNotificationWithIcon('warning', 'Error inserting the review. Please try again.')
//         }
//     } catch (error) {
//         console.error('Error al enviar la reseña:', error);
//         openNotificationWithIcon('warning', 'Error inserting the review. Please try again.')
//         setMessage('Error al insertar la reseña. Inténtalo de nuevo.');
//     }

//     setReview({
//         rating: 0,
//         title: '',
//         message: '',
//         userId: 1,
//         bookId: 1,
//     });
// };

// // console.log("rating:", rating);
// if (found) {
//     return <div>
//             <h4 className="text-2xl mb-4 text-black font-semibold">Thank you, review sent</h4>
//             <EstrellasRating average={rating} />
//             </div>
// }


// return (
//     <div>
//         {contextHolder}
//         <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
//             <div className="flex-auto p-5 lg:p-10">
//                 <h4 className="text-2xl mb-4 text-black font-semibold">Leave Your Book Review:</h4>
//                 <form id="feedbackForm" onSubmit={handleSubmit}>
//                     <div className="relative w-full mb-3">
//                         {/* <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="rating">
//                                                         Calificación seleccionada: {review.rating} estrellas
//                                                     </label> */}
//                         <Stars handleRatingChange={handleRatingChange} />
//                     </div>
//                     <div className="relative w-full mb-3">
//                         <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="title">
//                             Title
//                         </label>
//                         <input
//                             type="title"
//                             name="title"
//                             id="title"
//                             className="border-0 px-3 py-3 rounded text-sm shadow w-full bg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400"
//                             placeholder=""
//                             style={{ transition: 'all 0.15s ease 0s' }}
//                             required
//                             value={review.title}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div className="relative w-full mb-3">
//                         <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="feedback">
//                             Review
//                         </label>
//                         <textarea
//                             maxLength="300"
//                             name="message"
//                             id="message"
//                             rows="4"
//                             cols="80"
//                             className="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
//                             placeholder=""
//                             required
//                             value={review.message}
//                             onChange={handleInputChange}
//                         ></textarea>
//                     </div>
//                     <div className="text-center mt-6">
//                         <button
//                             id="feedbackBtn"
//                             className="bg-yellow-300 text-black text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
//                             type="submit"
//                             style={{ transition: 'all 0.15s ease 0s' }}
//                         >
//                             Submit
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </div>
// );