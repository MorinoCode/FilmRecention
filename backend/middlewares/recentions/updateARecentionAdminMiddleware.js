import RecensionModel from "../../models/recentionModel.js";

const updateARecentionAdminMiddleware = async (req, res, next) => {
  const { recId } = req.params;
  const { rating, comment } = req.body;

  // Check if the recension ID is provided
  if (!recId) {
    return res.status(400).json([{ message: "Recension ID is required" }]);
  }

  // Allow rating to be 0, so we check explicitly for undefined
  if (rating === undefined || comment === undefined) {
    return res
      .status(400)
      .json([{ message: "Rating and Comment are required" }]);
  }

  try {
    // Check if the recension exists
    const existingRecension = await RecensionModel.findById(recId);
    if (!existingRecension) {
      return res.status(404).json([{ message: "Recension not found" }]);
    }

    // Update the recension with new data and timestamp
    const updatedRecension = await RecensionModel.findByIdAndUpdate(
      recId,
      {
        rating,
        comment,
        modified_at: Date.now(),
      },
      { new: true } // Return the updated document
    );

    return res.status(200).json({ updatedRecension });
  } catch (err) {
    // Forward the error to the error handler
    next(err);
  }
};

export default updateARecentionAdminMiddleware;
