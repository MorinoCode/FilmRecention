import recentionModel from '../../models/recentionModel.js';

// Middleware to fetch reviews based on the movie ID
const fetchRecentionsMiddleware = async (req, res, next) => {
  const { id } = req.params;

  // Check if the movie ID was provided in the URL parameters
  if (!id) {
    return res.status(400).json([{ message: 'Movie ID is required' }]);
  }

  try {
    // Find all reviews linked to the given movie ID and include user info (username and email)
    const allComments = await recentionModel.find({ movieId: id }).populate("userId", "username email");

    // If no comments are found, return a 404 error
    if (!allComments || allComments.length === 0) {
      return res.status(404).json([{ message: 'No comments are registered yet' }]);
    }

    // Return the comments with a 200 OK response
    res.status(200).json(allComments);
  } catch (err) {
    // Pass any errors to the Express error handler
    next(err);
  }
};

// Export the middleware function
export default fetchRecentionsMiddleware;
