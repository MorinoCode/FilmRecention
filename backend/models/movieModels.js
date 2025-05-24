import mongoose, { Schema } from "mongoose";

// Define the schema for the movie model
const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: [true, "Title is already registered"],
      minLength: [2, "Title must be at least 2 characters long"],
      maxLength: [200, "Title cannot exceed 20 characters"],
    },

    director: {
      type: String,
      required: [true, "Director is required"],
     
    },

    releaseYear: {
      type: Number,
      required: true,
      min: [1888, "Release year is too early"], 
      max: [new Date().getFullYear() + 1, "Release year is too far in the future"],
    },

    genre: {
      type: String,
      required: true,
    },

    IMDB_rating: {
      type: Number,
      required: true,
      min: [0, "IMDB rating cannot be less than 0"],
      max: [10, "IMDB rating cannot exceed 10"],
    },

    user_rating: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "User rating cannot be less than 0"],
      max: [10, "User rating cannot exceed 10"],
    },
    image : {
      type: String,
      required: true,
      default : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrKzwI1LUg0ORMtSvgvjRjgHdTzAIu_rf2g&s'

    }
  },
  {
    timestamps: true,
  }
);

// Create a model for the movie schema
const movieModel = mongoose.model("Movie", movieSchema);

export default movieModel;
