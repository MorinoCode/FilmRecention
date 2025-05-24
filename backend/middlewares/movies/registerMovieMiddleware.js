import movieModel from "../../models/movieModels.js";
import movieValidator from "../../validators/movieValidator.js";

const registerMovieMiddleware = async (req, res, next) => {
  const { title, director, releaseYear, genre , IMDB_rating} = req.body;
  


  try {

    // Check if all required fields are provided
    if (!title || !director || !releaseYear || !genre ||!IMDB_rating) {
      return res
        .status(400)
        .json([
          {
            message:
              "All fields (title, director, releaseYear, genre, IMDB rating) are required",
          },
        ]);
   
    }

    // Validate the movie input using custom validator
    const validationResult = await movieValidator(req.body);
    if (validationResult !== true) {
      return res.status(400).json(validationResult);
    
    }

    // Check if a movie with the same title already exists
    const existingMovie = await movieModel.findOne({ title });
    if (existingMovie) {
      return res
        .status(400)
        .json([{ message: "This movie is already registered" }]);
     
    }

    // Create and save the new movie
    const newMovie = await movieModel.create(req.body);

    // Return success response
    return res.status(201).json(newMovie);
    
  } catch (err) {
    // Forward error to error handling middleware
    next(err);
   ;
  } 
};

export default registerMovieMiddleware;
