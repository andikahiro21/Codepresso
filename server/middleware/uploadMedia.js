/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */

const multer = require("multer");

const storage = multer.memoryStorage();

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    if (file.size > 5000000) {
      cb(new Error("Image file too large. Please upload images smaller than 5MB."), false);
    } else {
      cb(null, true);
    }
  } else {
    cb(new Error("Unsupported file type! Please upload only images."), false);
  }
};

const uploadImage = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5000000 },
});

module.exports = uploadImage;
