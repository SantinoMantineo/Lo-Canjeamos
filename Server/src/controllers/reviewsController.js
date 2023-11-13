const { Review, User, conn } = require("../DB_config");

const createReview = async (req, res) => {
    try {
        const { userId, reviewedUserId, rating} = req.body;

        const result = await Review.findAll({
            where: {
                userId: userId,
                reviewedUserId: reviewedUserId,
            },
        });
        console.log(result)
        if(result.length != 0){
            throw new Error("Ya haz calificado a este usuario")
        } else {
            const newReview = await Review.create({
                userId: userId,
                reviewedUserId: reviewedUserId,
                rating: rating
            });
    
            if(newReview) res.status(201)
        }
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
        
        const result = await Review.findAll({
            where: {
                reviewedUserId: userId,
            },
        });

        if (!result || result.length === 0) {
            res.status(404).json({ message: "No se encontraron reseñas para este usuario" });
            return;
        }

        let promedio = result.map(element => element.rating);

        const totalRating = promedio.reduce((sum, rating) => sum + rating, 0);
        const promedioFinal = totalRating / promedio.length;

        const averageRating = parseInt(promedioFinal)
        // Actualiza la propiedad averageRating del usuario en la base de datos
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

