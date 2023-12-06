/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const Joi = require("joi");

const validateBodyLogin = (reqBody) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        tlds: { allow: false },
      })
      .required()
      .messages({
        "string.base": "email must be a string.",
        "string.empty": "email is required.",
        "string.email": "email must be a valid email address.",
        "any.required": "email is required.",
      }),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(reqBody, {
    abortEarly: false,
  });

  if (error) {
    return error.details.map((err) => err.message).join(", ");
  }

  return null;
};

const validateBodyRegister = (reqBody) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        tlds: { allow: false },
      })
      .required()
      .messages({
        "string.base": "email must be a string.",
        "string.empty": "email is required.",
        "string.email": "email must be a valid email address.",
        "any.required": "email is required.",
      }),
    fullName: Joi.string().min(3).required(),
    phoneNumber: Joi.number().required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(reqBody, {
    abortEarly: false,
  });

  if (error) {
    return error.details.map((err) => err.message).join(", ");
  }

  return null;
};

const validateBodyForgot = (reqBody) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        tlds: { allow: false },
      })
      .required()
      .messages({
        "string.base": "email must be a string.",
        "string.empty": "email is required.",
        "string.email": "email must be a valid email address.",
        "any.required": "email is required.",
      }),
  });
  const { error } = schema.validate(reqBody, {
    abortEarly: false,
  });

  if (error) {
    return error.details.map((err) => err.message).join(", ");
  }

  return null;
};

const validateBodyReset = (reqBody) => {
  const schema = Joi.object({
    newPassword: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required().messages({
      "string.empty": "confirmPassword is required.",
      "any.only": "confirmPassword must be the same as newPassword",
      "any.required": "confirmPassword is required.",
    }),
  });
  const { error } = schema.validate(reqBody, {
    abortEarly: false,
  });

  if (error) {
    return error.details.map((err) => err.message).join(", ");
  }

  return null;
};

const validateBodyCategory = (reqBody) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  const { error } = schema.validate(reqBody, {
    abortEarly: false,
  });

  if (error) {
    return error.details.map((err) => err.message).join(", ");
  }

  return null;
};

module.exports = {
  validateBodyRegister,
  validateBodyLogin,
  validateBodyForgot,
  validateBodyReset,
  validateBodyCategory,
};
