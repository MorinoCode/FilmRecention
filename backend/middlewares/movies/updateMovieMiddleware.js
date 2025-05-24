import movieModel from "../../models/movieModels.js";
import movieValidator from "../../validators/movieValidator.js";

const updateMovieMiddleware = async (req, res, next) => {
  const { id } = req.params

  const { title, director, releaseYear, genre , IMDB_rating , image } = req.body;
  

  try {
    
    // Validate presence of required fields
    if (!title || !director || !releaseYear || !genre || !IMDB_rating || !image) {
      return res.status(400).json([{ message: "All fields (title, director, releaseYear, genre ,IMDB_rating ,image ) are required" }]);
    }

    // Validate movie input using custom validator
    const validationResult = await movieValidator(req.body);
    if (validationResult !== true) {
      return res.status(400).json(validationResult);
    }

    // Check if the movie to update exists
    const existingMovie = await movieModel.findById(id);
    if (!existingMovie) {
      return res.status(404).json([{ message: "This movie is not registered" }]);
    }
    
    // Update the movie with new data
    const updatedMovie = await movieModel.findByIdAndUpdate(id, {
  title, director, releaseYear, genre, IMDB_rating, image
}, { new: true });

    // Return the updated movie
    return res.status(200).json(updatedMovie);

  } catch (err) {
    next(err);
  }
};

export default updateMovieMiddleware;
