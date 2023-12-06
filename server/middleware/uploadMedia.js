const multer = require('multer')

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    if (file.size > 5000000) {
      cb(new Error('Image file too large. Please upload images smaller than 2MB.'), false)
    } else {
      cb(null, true)
    }
  } else {
    cb(new Error('Unsupported file type! Please upload only images'), false)
  }
}

const uploadMedia = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5000000 }
})

module.exports = uploadMedia
