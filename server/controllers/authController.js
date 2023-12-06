/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const { handleClientError, handleServerError } = require("../helpers/handleError");
const { User } = require("../models");
const joi = require("joi");
const { hashPassword, comparePassword } = require("../utils/bcryptPassword");
const { generateToken, generateTokenReset } = require("../utils/generateToken");
const sendForgotPasswordEmail = require("../utils/nodemailer");
const jwt = require("jsonwebtoken");
const zlib = require("zlib");
// const { decryptTextPayload } = require("../utils/decryptPayload");
const { validateBodyLogin, validateBodyRegister } = require("../helpers/validationJoi");

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // const emailDec = decryptTextPayload(email);
    // const passwordDec = decryptTextPayload(password);

    // if (!emailDec || !passwordDec) {
    //   return handleClientError(res, 403, "Invalid payload");
    // }

    const validate = validateBodyLogin(req.body);
    if (validate) {
      return handleClientError(res, 400, validate);
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return handleClientError(res, 404, "User Not Found");
    }

    const login = await comparePassword(password, email);
    if (!login) {
      return handleClientError(res, 400, "Incorrect Password");
    }
    user.password = undefined;

    const token = generateToken(user);
    res.status(200).json({ data: token, message: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.register = async (req, res) => {
  try {
    const newData = req.body;

    const validate = validateBodyRegister(req.body);
    if (validate) {
      return handleClientError(res, 400, validate);
    }
    const existingUser = await User.findOne({ where: { email: newData.email } });
    if (existingUser) {
      return handleClientError(res, 400, `User with email ${newData.email} already exist...`);
    }

    const hashingPassword = hashPassword(newData.password);
    newData.password = hashingPassword;
    newData.role = 2;

    await User.create(newData);

    res.status(201).json({ message: "User Created..." });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const scheme = joi.object({
      email: joi.string().email({ tlds: { allow: false } }),
    });
    const { error } = scheme.validate({ email });
    if (error) {
      return handleClientError(res, 400, error.details[0].message);
    }

    const user = await User.findOne({ where: { email }, attributes: { exclude: ["password"] } });
    if (!user) {
      return handleClientError(res, 404, "User Not Found");
    }

    const token = generateTokenReset(user);
    sendForgotPasswordEmail(email, token);

    res.status(200).json({ message: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const scheme = joi.object({
      newPassword: joi.string().min(6).required(),
      confirmPassword: joi.string().valid(joi.ref("newPassword")).required(),
    });

    const { error } = scheme.validate({ newPassword, confirmPassword });
    if (error) {
      return handleClientError(res, 400, error.details[0].message);
    }

    let { token } = req.params;
    token = token.replace(/_/g, "/");
    token = Buffer.from(token, "base64");

    let decompressedToken;
    try {
      decompressedToken = zlib.inflateSync(token).toString();
    } catch (decompressionError) {
      return handleClientError(res, 400, "Invalid token format");
    }
    const decoded = jwt.verify(decompressedToken, process.env.JWT_SECRET);

    const hashingPassword = hashPassword(newPassword);
    const hashedPassword = hashingPassword;

    await User.update({ password: hashedPassword }, { where: { email: decoded.data.email } });

    res.status(200).json({ message: "Success" });
  } catch (error) {
    if (error.message === "jwt expired") {
      return handleClientError(res, 400, "Token expired");
    }
    return handleServerError(res);
  }
};
