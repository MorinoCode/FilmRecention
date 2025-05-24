import userModel from '../../models/userModel.js';

const deleteUserMiddleware = async (req, res, next) => {
  const { userId } = req.params;

  // Check if user ID is provided in the URL
  if (!userId) {
    return res.status(400).json([{ message: 'User ID is required' }]);
  }

  try {
    // Check if the user exists
    const existingUser = await userModel.findById(userId);

    if (!existingUser) {
      return res.status(404).json([{ message: 'User not found' }]);
    }

    // Delete the user from the database
    const deletedUser = await userModel.findByIdAndDelete(userId);

    // Return a success message and the deleted user info
    return res.status(200).json({ message: 'User deleted successfully', deletedUser });

  } catch (error) {
    // Pass any errors to the Express error handler
    next(error);
  }
};

export default deleteUserMiddleware;
