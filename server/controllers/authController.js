/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const {
  handleClientError,
  handleServerError
} = require('../helpers/handleError');
const { Users, PurchaseGroups } = require('../models');
const { hashPassword, comparePassword } = require('../utils/bcryptPassword');
const { generateToken, generateTokenReset } = require('../utils/generateToken');
const sendForgotPasswordEmail = require('../utils/nodemailer');
const jwt = require('jsonwebtoken');
const zlib = require('zlib');
const {
  validateBodyLogin,
  validateBodyRegister,
  validateBodyForgot,
  validateBodyReset,
  validateBodyRegisterDriver
} = require('../helpers/validationJoi');
const {
  decryptTextPayload,
  decryptObjectPayload
} = require('../utils/decryptPayload');
const Redis = require('ioredis');
const handleResponseSuccess = require('../helpers/responseSuccess');
const {
  uploadToCloudinary,
  deleteFromCloudinary
} = require('../config/cloudinary');
const { Op } = require('sequelize');
const redisClient = new Redis();

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const emailDec = decryptTextPayload(email);
    const passwordDec = decryptTextPayload(password);

    if (!emailDec || !passwordDec) {
      return handleClientError(res, 403, 'Invalid payload');
    }

    const validate = validateBodyLogin({
      email: emailDec,
      password: passwordDec
    });
    if (validate) {
      return handleClientError(res, 400, validate);
    }

    const user = await Users.findOne({
      where: { email: emailDec },
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return handleClientError(res, 404, 'User Not Found');
    }
    const loginAttemptsKey = `loginAttempts:${emailDec}`;
    const loginAttempts = (await redisClient.get(loginAttemptsKey)) || 0;

    if (parseInt(loginAttempts) >= 3) {
      return handleClientError(
        res,
        400,
        'Account locked. Try again in 5 minutes.'
      );
    }
    const login = await comparePassword(passwordDec, emailDec);
    if (!login) {
      await redisClient.incr(loginAttemptsKey);

      if (parseInt(loginAttempts) + 1 >= 3) {
        await redisClient.expire(loginAttemptsKey, 300);
      }

      return handleClientError(res, 400, 'Incorrect Password');
    }

    await redisClient.del(loginAttemptsKey);

    const token = generateToken(user);

    return handleResponseSuccess(res, 200, 'success', token);
  } catch (error) {
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
    const existingUser = await Users.findOne({
      where: { email: decData.email }
    });
    if (existingUser) {
      return handleClientError(
        res,
        400,
        `User with email ${decData.email} already exist...`
      );
    }

    const hashingPassword = hashPassword(decData.password);
    decData.password = hashingPassword;
    decData.role = 2;

    const response = await Users.create({
      full_name: decData.fullName,
      email: decData.email,
      password: decData.password,
      phone_number: decData.phoneNumber,
      role: decData.role,
      image: process.env.AVATAR_URL_DEFAULT
    });

    await chatStreamClient.upsertUser({
      id: response.id.toString(),
      name: response.full_name,
      image: response.image
    });

    return handleResponseSuccess(res, 201, 'User Created');
  } catch (error) {
    return handleServerError(res);
  }
};
exports.registerDriver = async (req, res) => {
  let imageResult;
  try {
    const newData = req.body;
    const decData = decryptObjectPayload(newData);

    const validate = validateBodyRegisterDriver(decData);
    if (validate) {
      return handleClientError(res, 400, validate);
    }
    const existingUser = await Users.findOne({
      where: { email: decData.email }
    });
    if (existingUser) {
      return handleClientError(
        res,
        400,
        `User with email ${decData.email} already exist...`
      );
    }
    if (!req.files || !req.files.image) {
      return handleClientError(res, 400, 'Image Required');
    }
    let imageUploaded = false;

    try {
      imageResult = await uploadToCloudinary(
        req.files.image[0],
        'image',
        'images'
      );
      imageUploaded = true;
    } catch (uploadError) {
      if (imageUploaded) {
        await deleteFromCloudinary(imageResult.public_id);
      }
      return handleClientError(res, 500, 'Error uploading files to Cloudinary');
    }

    const hashingPassword = hashPassword(decData.password);
    decData.password = hashingPassword;
    decData.role = 3;

    const response = await Users.create({
      full_name: decData.fullName,
      email: decData.email,
      password: decData.password,
      phone_number: decData.phoneNumber,
      role: decData.role,
      image: imageResult.secure_url || process.env.AVATAR_URL_DEFAULT
    });

    await chatStreamClient.upsertUser({
      id: response.id.toString(),
      name: response.full_name,
      image: response.image
    });

    return handleResponseSuccess(res, 201, 'User Created', decData);
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

    const user = await Users.findOne({
      where: { email },
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return handleClientError(res, 404, 'User Not Found');
    }

    const token = generateTokenReset(user);
    sendForgotPasswordEmail(email, token);

    res.status(200).json({ message: 'Success' });
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
    token = token.replace(/_/g, '/');
    token = Buffer.from(token, 'base64');

    let decompressedToken;
    try {
      decompressedToken = zlib.inflateSync(token).toString();
    } catch (decompressionError) {
      return handleClientError(res, 400, 'Invalid token format');
    }
    const decoded = jwt.verify(decompressedToken, process.env.JWT_SECRET);

    const hashingPassword = hashPassword(decData.newPassword);

    await Users.update(
      { password: hashingPassword },
      { where: { email: decoded.data.email } }
    );

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    if (error.message === 'jwt expired') {
      return handleClientError(res, 400, 'Token expired');
    }
    return handleServerError(res);
  }
};

exports.checkDriverDelivery = async (req, res) => {
  try {
    const unavailableDrivers = await PurchaseGroups.findAll({
      attributes: ['driver_id'],
      where: {
        status: 'On-Delivery'
      }
    });

    const unavailableDriverIds = unavailableDrivers.map(
      (driver) => driver.driver_id
    );

    const availableUsers = await Users.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      where: {
        id: {
          [Op.notIn]: unavailableDriverIds
        },
        role: 3
      },
      raw: true,
      nest: true
    });

    const userData = availableUsers.map((user) => ({
      id: user.id,
      name: user.full_name,
      image: user.image
    }));

    return handleResponseSuccess(res, 200, 'success', userData);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { fullName, email, image } = req.body;
    const randomPassword = Math.random().toString(36).substring(2, 10);

    const [user, created] = await Users.findOrCreate({
      where: { email },
      defaults: {
        full_name: fullName,
        email,
        image,
        password: hashPassword(randomPassword),
        role: 2,
        phone_number: '0812345678910'
      },
      attributes: { exclude: ['password'] }
    });

    const token = generateToken(user);

    return handleResponseSuccess(res, created ? 201 : 200, 'success', token);
  } catch (error) {
    return handleServerError(res);
  }
};
