import mongoose, { Schema } from "mongoose";

// Define the schema for the user model
const userSchema = new Schema(
  {
    // Username field with validation rules
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username is already registered"],
      minLength: [3, "Username must be at least 3 characters long"],
      maxLength: [20, "Username cannot exceed 20 characters"],
    },

    // Email field with validation rules
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email address is already registered"],
      match: [
        /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, // Regex pattern for valid email
        "Email address is not valid",
      ],
    },

    // Password field with validation rules
    password: {
      type: String,
      required: true,
      minLength: [5, "Password is too short"],
      maxLength: [150, "Password cannot exceed 150 characters"],
      match: [
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, // Password must contain at least one uppercase letter, one lowercase letter, and one number
        "Password is not valid",
      ],
    },

    role: {
      type: String,
      required: true,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Create a model for the user schema
const userModel = mongoose.model("User", userSchema);

export default userModel;
