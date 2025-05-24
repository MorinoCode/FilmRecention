import movieModel from "../../models/movieModels.js";

const deleteMovieMiddleware = async (req, res, next) => {
  const { title } = req.body;

  try {
    if (!title) {
      return res.status(400).json([{ message: "Movie title is required" }]);
    }

    // Case-insensitive search for the movie title
    const existingMovie = await movieModel.findOne({ 
      title: { $regex: new RegExp(`^${title}$`, "i") } 
    });

    if (!existingMovie) {
      return res.status(404).json([{ message: "This movie is not registered" }]);
    }

    // Delete the movie by its ID
    const deletedMovie = await movieModel.findByIdAndDelete(existingMovie._id);

    return res.status(200).json(deletedMovie);
  } catch (err) {
    next(err);
  }
};

export default deleteMovieMiddleware;
