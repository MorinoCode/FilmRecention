import RecensionModel from "../../models/recentionModel.js";
import userModel from "../../models/userModel.js";

const updateARecentionMiddleware = async (req, res, next) => {
  const { recId, userId } = req.params;
  const { rating, comment } = req.body;

  if (!recId || !userId) {
    return res
      .status(400)
      .json([{ message: "Recension ID and User ID are required" }]);
  }

  if (!rating || !comment) {
    return res
      .status(400)
      .json([{ message: "Rating and Comment are required" }]);
  }

  try {
    // ✅ Find recension by ID
    const existingRecension = await RecensionModel.findById(recId);
    if (!existingRecension) {
      return res.status(404).json([{ message: "Recension not found" }]);
    }

    // ✅ Verify the user exists
    const userExists = await userModel.findById(userId);
    if (!userExists) {
      return res.status(404).json([{ message: "User not found" }]);
    }

    if (existingRecension.userId.toString() !== userId) {
      return res
        .status(403)
        .json([{ message: "You are not allowed to update this recension" }]);
    }

    // ✅ Update the recension with new rating and comment
    const updatedRecension = await RecensionModel.findByIdAndUpdate(
      recId,
      {
        rating,
        comment,
        modified_at: Date.now(),
      },
      {
        new: true,
      }
    );

    res.status(200).json({ updatedRecension });
  } catch (err) {
    next(err);
  }
};

export default updateARecentionMiddleware;
