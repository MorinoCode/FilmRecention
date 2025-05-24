import movieModel from "../../models/movieModels.js";
import recentionModel from "../../models/recentionModel.js";

const fetchMoviesUserRatingMiddleware = async (req, res, next) => {
  try {
    // Fetch all movies from the database
    const allMovies = await movieModel.find({});

    // If no movies are found, return a 400 error
    if (allMovies.length === 0) {
      return res.status(400).json([{ message: "No movie is registered yet" }]);
    }

    // Fetch all reviews (recentions) from the database
    const allRecentions = await recentionModel.find({});

    // If no reviews are found, return a 400 error
    if (allRecentions.length === 0) {
      return res.status(400).json([{ message: "No recention registered yet" }]);
    }

    const updatedMovies = [];

    for (const movie of allMovies) {
      // Filter the reviews that belong to the current movie
      const relatedRecentions = allRecentions.filter(
        (rec) => rec.movieId.toString() === movie._id.toString()
      );

      if (relatedRecentions.length > 0) {
        // Calculate the average rating for this movie
        const totalRating = relatedRecentions.reduce(
          (sum, rec) => sum + rec.rating,
          0
        );
        const averageRating = totalRating / relatedRecentions.length;

        // Update the movie's user_rating field with the average
        movie.user_rating = averageRating;

        // Save the updated movie back to the database
        await movie.save();

        // Add the updated movie to the response list
        updatedMovies.push(movie);
      }
    }

    // Return the list of updated movies with user ratings
    res.status(200).json(updatedMovies);
  } catch (err) {
    // Pass any errors to the next middleware or error handler
    next(err);
  }
};

export default fetchMoviesUserRatingMiddleware;
