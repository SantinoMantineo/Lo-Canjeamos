const { Review, User, conn } = require("../DB_config");

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

const allReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reviews.' });
    }
};

const getReviewById = async (req, res) => {
    const reviewId = req.params.id;
    try {
        const review = await Review.findByPk(reviewId);

        if (!review) {
        res.status(404).json({ error: 'Review no encontrada.' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la review.' });
    }
};

const getAverageRatingByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const result = await Review.findOne({
            attributes: [
                [conn.fn("AVG", conn.col("rating")), "averageRating"],
            ],
            where: {
                userId: userId,
            },
        });

        if (!result || !result.dataValues.averageRating) {
            res.status(404).json({ message: "No se encontraron reseñas para este usuario" });
            return;
        }

        const averageRating = parseInt(result.dataValues.averageRating);

        await User.update({ averageRating }, {
            where: {
                id: userId,
            },
        });

        res.json({ averageRating });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al calcular el promedio de calificaciones", error: error.message });
    }
};


module.exports = {
    createReview,
    allReviews,
    getReviewById,
    getAverageRatingByUser
}

