import userModel from "../../models/userModel.js";

// Middleware to fetch users from the database based on the user's role
const fetchUsersMiddleware = async (req, res, next) => {
  try {
    // Check if the current user is an admin
    if (req.user && req.user.userRole === "admin") {
      // Assuming `req.user` contains the authenticated user's data

      // Fetch all users from the database (admin can access everything)
      const allUsers = await userModel.find({});

      // If no users are found, send a 400 status with a message
      if (allUsers.length === 0) {
        return res.status(400).json([{ message: "No users are registered." }]);
      }

      // If users are found, send them back with a 200 status
      res.status(200).json(allUsers);
    } else {
      // If a normal user sends the request, only return general user data (excluding sensitive info)
      const allUsers = await userModel.find(
        {},
        {   updatedAt : 0 , __v : 0}
      );

      // If no users are found, send a 400 status with a message
      if (allUsers.length === 0) {
        return res.status(400).json([{ message: "No users are registered." }]);
      }

      // If users are found, send them back with a 200 status
      res.status(200).json(allUsers);
    }
  } catch (err) {
    // If an error occurs, pass it to the next error handling middleware
    next(err);
  }
};

export default fetchUsersMiddleware;
