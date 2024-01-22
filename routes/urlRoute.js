const express = require('express');
const router = express.Router();
const { handleGenerateNewShortUrl, handleGetAnalytics } = require('../controllers/urlController');


router.route('/').post(handleGenerateNewShortUrl);
router.route('/analytics/:shortId').get(handleGetAnalytics);
module.exports = router;