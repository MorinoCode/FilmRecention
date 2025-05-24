import Validator from "fastest-validator";

const v = new Validator();

// Define the validation schema

const schema = {
  // Username field validation
  username: {
    type: "string",
    required: true,
    messages: {
      required: "Username is required",
      usernameEmpty: "Username field cannot be empty", 
      username: "Username is not valid", 
    },
  },
  // Email field validation
  email: {
    type: "email",
    required: true,
    messages: {
      required: "Email is required",
      emailEmpty: "Email field cannot be empty", 
      email: "Email is not valid", 
    },
  },

  // Password field validation
  password: {
    type: "string",
    required: true,
    min: 5,
    max: 150,
    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, // Password must have at least one uppercase letter, one lowercase letter, and one number
    messages: {
      required: "Password is required",
      stringMin: "Password is too short", 
      stringMax: "Password cannot exceed 150 characters", 
      stringPattern: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    },
  },

};

const validate = v.compile(schema);

const validatAndSanitize = (data) => {
  const result = validate(data);
  if (result !== true) {
    const sanitizedErrors = result.map((error) => {
      const { expected, actual, type,field , ...rest } = error;
      return rest;
    });
    return sanitizedErrors;
  } else {
    return true;
  }
};
export default validatAndSanitize;
