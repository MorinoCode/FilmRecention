import movieModel from "../../models/movieModels.js";

const fetchAMovieMiddleware = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Check if movie ID is provided in the request parameters
    if (!id) {
      return res.status(400).json([{ message: "Movie ID is required" }]);
    }

    // Fetch the movie from the database using its ID
    const movie = await movieModel.findById(id);

    // If no movie was found, return an error response
    if (!movie) {
      return res.status(404).json([{ message: "Movie not found" }]);
    }

    // If movie is found, send it in the response
    res.status(200).json(movie);
    
  } catch (err) {
    // Forward any unexpected errors to the error handler
    next(err);
  }
};

export default fetchAMovieMiddleware;
