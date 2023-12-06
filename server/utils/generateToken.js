const jwt = require('jsonwebtoken')
const zlib = require('zlib')

const generateToken = (data) => {
  return jwt.sign(
    {
      data
    },
    process.env.JWT_SECRET
  )
}

const generateCompressedToken = (jwtToken) => {
  const compressedToken = zlib.deflateSync(Buffer.from(jwtToken)).toString('base64')
  return compressedToken
}

const generateTokenReset = (data) => {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 5 * 60,
      data
    },
    process.env.JWT_SECRET
  )
  const compressToken = generateCompressedToken(token)
  return compressToken.replace(/\//g, '_')
}

module.exports = {
  generateToken,
  generateTokenReset
}
