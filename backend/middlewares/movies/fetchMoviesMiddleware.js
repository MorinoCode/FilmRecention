import movieModel from "../../models/movieModels.js";

const fetchMoviesMiddleware = async (req, res, next) => {
  try {
    // Fetch all movies from the database 

    const allMovies = await movieModel.find({},{__v :0 , createdAt : 0 , updatedAt: 0});

    if (allMovies.length === 0) {
        return res.status(400).json([{ message: "No movies are registered." }]);
      }

    res.status(200).json(allMovies);
    
  } catch (err) {
    next(err);
  }
};
export default fetchMoviesMiddleware;
