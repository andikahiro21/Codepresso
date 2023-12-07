/* eslint-disable quotes */
/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
const { handleClientError } = require("../helpers/handleError");

async function handleLoginAttempts(redisClient, emailDec, res) {
  const loginAttemptsKey = `loginAttempts:${emailDec}`;
  let loginAttempts = parseInt(await redisClient.get(loginAttemptsKey)) || 0;

  if (loginAttempts >= 3) {
    handleClientError(res, 400, "Account locked. Try again in 5 minutes.");
    return false;
  }

  await redisClient.incr(loginAttemptsKey);
  loginAttempts += 1;

  if (loginAttempts >= 3) {
    await redisClient.expire(loginAttemptsKey, 300);
  }

  return true;
}

module.exports = { handleLoginAttempts };
