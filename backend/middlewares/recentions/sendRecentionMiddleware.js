import movieModel from "../../models/movieModels.js";
import userModel from "../../models/userModel.js";
import recentionModel from "../../models/recentionModel.js";

import isRecentionValidator from "../../validators/recentionValidator.js";

const sendRecentionMiddleware = async (req, res, next) => {
  // Destructure movie ID and user ID from the route parameters
  const { id, userId } = req.params;

  // Destructure rating and comment from the request body
  const { rating, comment } = req.body;

  // Check if both movie ID and user ID are provided
  if (!id || !userId) {
    return res.status(400).json([{ message: "Movie ID and User ID are required" }]);
  }

  // Check if both rating and comment are provided
  if (!rating || !comment) {
    return res.status(400).json([{ message: "Rating and Comment are required" }]);
  }

  try {
    // Check if the movie exists in the database
    const isMovieExist = await movieModel.findById(id);
    if (!isMovieExist) {
      return res.status(404).json([{ message: "Movie not found" }]);
    }

    // Check if the user exists in the database
    const isUserExist = await userModel.findById(userId);
    if (!isUserExist) {
      return res.status(404).json([{ message: "User not found" }]);
    }

    // Validate the review data using the validator
    const isRecentionValid = isRecentionValidator({ movieId: id, userId, rating, comment });
    if (isRecentionValid !== true) {
      return res.status(400).json(isRecentionValid); // Return validation errors
    }

    // Prevent the user from reviewing the same movie more than once
    const existingReview = await recentionModel.findOne({ movieId: id, userId });
    if (existingReview) {
      return res.status(409).json([{ message: "You have already reviewed this movie" }]);
    }

    // Create a new review in the database
    const newRecention = await recentionModel.create({
      movieId: id,
      userId,
      rating,
      comment,
    });

    // Respond with the newly created review
    res.status(201).json({ newRecention });

  } catch (err) {
   
    next(err);
  }
};

export default sendRecentionMiddleware;
