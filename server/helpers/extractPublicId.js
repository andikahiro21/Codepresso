/* eslint-disable semi */
/* eslint-disable quotes */
const extractPublicId = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 1].split(".")[0];
};

module.exports = { extractPublicId };
