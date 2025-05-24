import RecensionModel from "../../models/recentionModel.js";

// Middleware to fetch all movie recension (review) documents from the database
const fetchAllRecentionsMiddleware = async (req, res, next) => {
  try {
    // Fetch all recension documents
    const allRecentions = await RecensionModel.find({});

    // Check if the list is empty
    if (allRecentions.length === 0) {
      return res.status(404).json([{ message: "No reviews are registered yet" }]);
    }

    // Respond with all recension data
    res.status(200).json(allRecentions);

  } catch (err) {
    // Forward any unexpected error to the error handler
    next(err);
  }
};

export default fetchAllRecentionsMiddleware;
