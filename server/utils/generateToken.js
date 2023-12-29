/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
const jwt = require("jsonwebtoken");
const zlib = require("zlib");

const generateToken = (data) => {
  const token = jwt.sign(
    {
      data,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "6h",
    }
  );

  return token;
};

const generateCompressedToken = (jwtToken) => {
  const compressedToken = zlib.deflateSync(Buffer.from(jwtToken)).toString("base64");
  return compressedToken;
};

const generateTokenReset = (data) => {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 5 * 60,
      data,
    },
    process.env.JWT_SECRET
  );
  const compressToken = generateCompressedToken(token);
  return compressToken.replace(/\//g, "_");
};

module.exports = {
  generateToken,
  generateTokenReset,
};
