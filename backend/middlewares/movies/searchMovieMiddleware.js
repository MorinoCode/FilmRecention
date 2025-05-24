import movieModel from "../../models/movieModels.js";

// Middleware function to search for movies by title and/or director
const searchMovieMiddleware = async (req, res, next) => {

  // Destructure search parameters from query string
  const { title, director } = req.query;

  try {
    // Build a dynamic query object
    const query = {};

    // If 'title' is provided, add a case-insensitive regex match to the query
    if (title) query.title = { $regex: title, $options: 'i' };

    // If 'director' is provided, add a case-insensitive regex match to the query
    if (director) query.director = { $regex: director, $options: 'i' };

    // Search the database using the constructed query
    const movies = await movieModel.find(query);
    
    // If no movies are found, return a 404 response
    if (movies.length === 0) {
      return res.status(404).json([{ message: 'No matching movie found' }]);
    }

    // If movies are found, return them in the response
    return res.status(200).json(movies);
    
  } catch (err) {
    // Pass any errors to the next middleware or error handler
    next(err);
  }
}

export default searchMovieMiddleware;
