import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../models/userModel.js";

const loginMiddleware = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Check if either username or email is provided
    if (!username && !email) {
      return res
        .status(400)
        .json([{ message: "Either username or email is required." }]);
    }

    // Check if password is provided
    if (!password) {
      return res.status(400).json([{ message: "Password is required." }]);
    }

    // Search for user by username or email (case-insensitive)
    const user = await userModel.findOne({
      $or: [
        { username: { $regex: new RegExp(`^${username}$`, "i") } },
        { email: { $regex: new RegExp(`^${email}$`, "i") } },
      ],
    });

    // If no user is found
    if (!user) {
      return res.status(400).json([{ message: "User does not exist." }]);
    }

    // Check if the password matches the stored hash
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json([{ message: "Incorrect password." }]);
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId : user._id,
        username: user.username,
        userEmail: user.email,
        userRole: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "70m" }
    );

    // Send the token back in the response
    res.status(200).json({ message: `Welcome ${user.username}`, token });
  } catch (err) {
    next(err); // Pass error to the next error handling middleware
  }
};

export default loginMiddleware;
