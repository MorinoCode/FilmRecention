import recensionModel from "../../models/recentionModel.js";

// Middleware to delete a recension (review) by its ID
const deleteARecentionMiddleware = async (req, res, next) => {
  const { recId } = req.params;

  // Check if recension ID is provided
  if (!recId) {
    return res.status(400).json([{ message: "Recension ID is required" }]);
  }

  try {
    // Attempt to delete the recension by ID
    const deletedRecension = await recensionModel.findByIdAndDelete(recId);

    // If no recension was found and deleted, send an error response
    if (!deletedRecension) {
      return res
        .status(404) // ✅ 404 is more appropriate than 400 when not found
        .json([{ message: "Recension not found or already deleted" }]);
    }

    // Successfully deleted
    res.status(200).json({ deletedRecension });
  } catch (err) {
    // Forward error to error-handling middleware
    next(err);
  }
};

export default deleteARecentionMiddleware;
