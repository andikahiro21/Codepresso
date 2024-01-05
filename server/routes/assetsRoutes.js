const express = require('express');
const router = express.Router();
const { getTranslation, getAssetsImages } = require('../controllers/assetsController');

router.get('/web/translations', getTranslation)
router.get('/web/assets', getAssetsImages)

module.exports = router;