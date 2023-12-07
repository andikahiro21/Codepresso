/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const { handleClientError, handleServerError } = require("../helpers/handleError");
const { Users } = require("../models");
const { hashPassword, comparePassword } = require("../utils/bcryptPassword");
const { generateToken, generateTokenReset } = require("../utils/generateToken");
const sendForgotPasswordEmail = require("../utils/nodemailer");
const jwt = require("jsonwebtoken");
const zlib = require("zlib");
const { validateBodyLogin, validateBodyRegister, validateBodyForgot, validateBodyReset } = require("../helpers/validationJoi");
const { decryptTextPayload, decryptObjectPayload } = require("../utils/decryptPayload");
const Redis = require("ioredis");
const handleResponseSuccess = require("../helpers/responseSuccess");
const redisClient = new Redis();

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const emailDec = decryptTextPayload(email);
    const passwordDec = decryptTextPayload(password);

    if (!emailDec || !passwordDec) {
      return handleClientError(res, 403, "Invalid payload");
    }

    const validate = validateBodyLogin({ email: emailDec, password: passwordDec });
    if (validate) {
      return handleClientError(res, 400, validate);
    }

    const user = await Users.findOne({
      where: { email: emailDec },
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return handleClientError(res, 404, "User Not Found");
    }
    const loginAttemptsKey = `loginAttempts:${emailDec}`;
    const loginAttempts = (await redisClient.get(loginAttemptsKey)) || 0;

    if (parseInt(loginAttempts) >= 3) {
      return handleClientError(res, 400, "Account locked. Try again in 5 minutes.");
    }
    const login = await comparePassword(passwordDec, emailDec);
    if (!login) {
      await redisClient.incr(loginAttemptsKey);

      if (parseInt(loginAttempts) + 1 >= 3) {
        await redisClient.expire(loginAttemptsKey, 300);
      }

      return handleClientError(res, 400, "Incorrect Password");
    }

    await redisClient.del(loginAttemptsKey);

    const token = generateToken(user);

    res.status(200).json({ data: token, message: "Success" });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};

exports.register = async (req, res) => {
  try {
    const newData = req.body;
    const decData = decryptObjectPayload(newData);
    const validate = validateBodyRegister(decData);
    if (validate) {
      return handleClientError(res, 400, validate);
    }
    const existingUser = await Users.findOne({ where: { email: decData.email } });
    if (existingUser) {
      return handleClientError(res, 400, `User with email ${decData.email} already exist...`);
    }

    const hashingPassword = hashPassword(decData.password);
    decData.password = hashingPassword;
    decData.role = 2;

    await Users.create({
      full_name: decData.fullName,
      email: decData.email,
      password: decData.password,
      phone_number: decData.phoneNumber,
      role: decData.role,
      image: process.env.AVATAR_URL_DEFAULT,
    });

    return handleResponseSuccess(res, 201, "User Created");
  } catch (error) {
    return handleServerError(res);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const validate = validateBodyForgot(req.body);

    if (validate) {
      return handleClientError(res, 400, validate);
    }

    const user = await Users.findOne({ where: { email }, attributes: { exclude: ["password"] } });
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
    // eslint-disable-next-line no-unused-vars
    const { newPassword, confirmPassword } = req.body;

    const decData = decryptObjectPayload(req.body);
    const validate = validateBodyReset(decData);
    if (validate) {
      return handleClientError(res, 400, validate);
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

    const hashingPassword = hashPassword(decData.newPassword);

    await Users.update({ password: hashingPassword }, { where: { email: decoded.data.email } });

    res.status(200).json({ message: "Success" });
  } catch (error) {
    if (error.message === "jwt expired") {
      return handleClientError(res, 400, "Token expired");
    }
    return handleServerError(res);
  }
};
