import userModel from "../../models/userModel.js";

const makeUserAdminMiddleware = async (req, res, next) => {
  const { userId } = req.params;

  // Check if user ID is provided
  if (!userId) {
    return res.status(400).json([{ message: "User ID is required" }]);
  }

  try {
    // Find the user in the database
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json([{ message: "User not found" }]);
    }

    // Update the user's role to "admin"
    user.role = "admin";

    // Save the changes to the database
    await user.save();

    // Return success message with updated user info
    return res.status(200).json({ message: "User has been made admin", user });
  } catch (error) {
    // Forward any errors to the error handler
    next(error);
  }
};

export default makeUserAdminMiddleware;
