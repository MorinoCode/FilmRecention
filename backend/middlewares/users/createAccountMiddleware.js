import bcrypt from "bcrypt";
import userModel from "../../models/userModel.js";
import userValidator from "../../validators/userValidator.js";

const createAccountMiddleware = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json([{ message: "All fields are required" }]);
    }

    // Validate user data with the custom validator
    const isUserValid = await userValidator(req.body);

    if (isUserValid !== true) {
      return res.status(400).json(isUserValid);
    }

    // Check if the user already exists (case-insensitive search)
    const isUserExist = await userModel.findOne({
      $or: [
        { username: { $regex: new RegExp(`^${username}$`, "i") } },
        { email: { $regex: new RegExp(`^${email}$`, "i") } },
      ],
    });

    if (isUserExist) {
      return res.status(400).json([{ message: "User is already registered" }]);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // Return the newly created user
    res.status(201).json(newUser);
  } catch (err) {
    // Pass error to the next error handling middleware
    next(err);
  }
};

export default createAccountMiddleware;
