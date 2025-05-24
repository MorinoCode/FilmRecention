import Validator from "fastest-validator";

const v = new Validator();

// Define the validation schema

const schema = {
  // movie field validation
  title: {
    type: "string",
    required: true,
    messages: {
      required: "title is required",
      titleEmpty: "title field cannot be empty",
      title: "title is not valid",
    },
  },
  // director field validation
  director: {
    type: "string",
    required: true,
    messages: {
      required: "director is required",
      directorEmpty: "director field cannot be empty",
      director: "director is not valid",
    },
  },
  // genre field validation
  genre: {
    type: "string",
    required: true,
    messages: {
      required: "genre is required",
      genreEmpty: "genre field cannot be empty",
      genre: "genre is not valid",
    },
  },
  // image field validation
  image: {
    type: "string",
    required: true,
    messages: {
      required: "image is required",
      imageEmpty: "image field cannot be empty",
      image: "image is not valid",
    },
  },
  // IMDB_rating field validation
  IMDB_rating: {
    type: "number",
    required: true,
    messages: {
      required: "IMDB_rating is required",
      IMDB_ratingEmpty: "IMDB_rating field cannot be empty",
      IMDB_rating: "IMDB_rating is not valid",
    },
  },
  releaseYear: {
    type: "number",
    required: true,
    messages: {
      required: "releaseYear is required",
      releaseYearEmpty: "releaseYear field cannot be empty",
      releaseYear: "releaseYear is not valid",
    },
  },
};

const validate = v.compile(schema);

const validatAndSanitize = (data) => {
  const result = validate(data);
  if (result !== true) {
    const sanitizedErrors = result.map((error) => {
      const { expected, actual, type, field, ...rest } = error;
      return rest;
    });
    return sanitizedErrors;
  } else {
    return true;
  }
};
export default validatAndSanitize;
