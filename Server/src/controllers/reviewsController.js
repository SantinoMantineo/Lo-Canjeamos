const { Review, User } = require("../DB_config");

const createReview = async (req, res) => {
    try {
        const { userId, reviewedUserId, rating, title, message } = req.body;

        const newReview = await Review.create({
            userId,
            reviewedUserId,
            rating,
            title,
            message,
        });

        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la reseña", error: error.message });
    }
};

//  const listReviews = async(req, res) => {
//     try {
//       const reviews = await Review.findAll();
//       return res.json(reviews);
//     } catch (error) {
//       return res.status(500).json({ error: 'Error al obtener las reviews.' });
//     }
//   }

// const getReviewById = async (req, res) => {
//     const reviewId = req.params.id;
//     try {
//       const review = await Review.findByPk(reviewId);
//       if (!review) {
//         return res.status(404).json({ error: 'Review no encontrada.' });
//       }
//       return res.json(review);
//     } catch (error) {
//       return res.status(500).json({ error: 'Error al obtener la review.' });
//     }
//   }


// module.exports = {
//     createReview,
//     listReviews,
//     getReviewById,
//   };

module.exports = {
    createReview
}