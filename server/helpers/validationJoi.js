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

const validateBodyRegisterDriver = (reqBody) => {
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
    image: Joi.any().valid("image/jpeg", "image/png", "image/gif"),
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

const validateBodyAddons = (reqBody) => {
  const schema = Joi.object({
    menu_id: Joi.number().integer().positive().required(),
    sizes: Joi.bool(),
    beans: Joi.bool(),
    milk: Joi.bool(),
    sugars: Joi.bool(),
  });

  const { error } = schema.validate(reqBody, {
    abortEarly: false,
  });

  if (error) {
    return error.details.map((err) => err.message).join(", ");
  }

  return null;
};

const validateBodyAddress = (reqBody) => {
  const schema = Joi.object({
    address_name: Joi.string().required(),
    lat: Joi.number().required(),
    long: Joi.number().required(),
  });
  const { error } = schema.validate(reqBody, {
    abortEarly: false,
  });

  if (error) {
    return error.details.map((err) => err.message).join(", ");
  }

  return null;
};

const validateBodyBasket = (reqBody) => {
  const schema = Joi.object({
    menu_id: Joi.number().integer().positive().required(),
    sugar_id: Joi.any().allow(null),
    size_id: Joi.any().allow(null),
    bean_id: Joi.any().allow(null),
    milk_id: Joi.any().allow(null),
    qty: Joi.number().integer().positive().required(),
  });

  const { error } = schema.validate(reqBody, {
    abortEarly: false,
  });

  if (error) {
    return error.details.map((err) => err.message).join(", ");
  }

  return null;
};

const validateBodyMenu = (reqBody) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    category_id: Joi.number().integer().required(),
    description: Joi.string().allow(""),
    type: Joi.string().required(),
    image: Joi.any().valid("image/jpeg", "image/png", "image/gif"),
    price: Joi.number().integer().required(),
    qty: Joi.number().integer().min(0).required(),
    sizes: Joi.bool(),
    beans: Joi.bool(),
    milk: Joi.bool(),
    sugars: Joi.bool(),
  });
  const { error } = schema.validate(reqBody, {
    abortEarly: false,
  });

  if (error) {
    return error.details.map((err) => err.message).join(", ");
  }

  return null;
};

const validateBodyEditMenu = (reqBody) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    category_id: Joi.number().integer().required(),
    description: Joi.string().allow(""),
    type: Joi.string().required(),
    image: Joi.any().allow(null),
    price: Joi.number().integer().required(),
    qty: Joi.number().integer().min(0).required(),
    sizes: Joi.bool(),
    beans: Joi.bool(),
    milk: Joi.bool(),
    sugars: Joi.bool(),
  });
  const { error } = schema.validate(reqBody, {
    abortEarly: false,
  });

  if (error) {
    return error.details.map((err) => err.message).join(", ");
  }

  return null;
};

const validateBodyPurchase = (reqBody) => {
  const schema = Joi.object({
    distance: Joi.number().precision(6).required(),
    note: Joi.string().optional(),
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
  validateBodyMenu,
  validateBodyAddress,
  validateBodyBasket,
  validateBodyAddons,
  validateBodyPurchase,
  validateBodyEditMenu,
  validateBodyRegisterDriver,
};
