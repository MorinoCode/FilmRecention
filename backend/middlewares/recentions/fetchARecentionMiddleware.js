import RecensionModel from "../../models/recentionModel.js";

// Middleware to fetch a single movie recension (review) by its ID
const fetchARecentionMiddleware = async (req, res, next) => {
  // Destructure the recension ID from the query string
  const { recId } = req.query;

  // Validate that the recension ID is provided
  if (!recId) {
    return res.status(400).json([{ message: "Recension ID is required" }]);
  }

  try {
    // Find a recension by ID. 
    const recension = await RecensionModel.findById(recId);

    // If recension not found, return 404
    if (!recension) {
      return res.status(404).json([{ message: "This recension was not found" }]);
    }

    // Return the recension document
    res.status(200).json(recension);

  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default fetchARecentionMiddleware;
