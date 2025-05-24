import Validator from "fastest-validator";

const v = new Validator();

// Validation schema for Recension
const schema = {
  movieId: {
    type: "string",
    empty: false,
    required: true,
    messages: {
      required: "movieId is required",
      string: "movieId must be a string",
      stringEmpty: "movieId cannot be empty",
    },
  },
  userId: {
    type: "string",
    empty: false,
    required: true,
    messages: {
      required: "userId is required",
      string: "userId must be a string",
      stringEmpty: "userId cannot be empty",
    },
  },
  rating: {
    type: "number",
    required: true,
    min: 0,
    max: 10,
    messages: {
      required: "rating is required",
      number: "rating must be a number",
      numberMin: "rating must be at least 1",
      numberMax: "rating cannot exceed 5",
    },
  },
  comment: {
    type: "string",
    empty: false,
    required: true,
    messages: {
      required: "comment is required",
      string: "comment must be a string",
      stringEmpty: "comment cannot be empty",
    },
  },
};

const validate = v.compile(schema);

const validateRecension = (data) => {
  const result = validate(data);
  if (result !== true) {
    return result.map(({ expected, actual, type, field, ...rest }) => rest);
  }
  return true;
};

export default validateRecension;
