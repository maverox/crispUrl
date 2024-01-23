const express = require('express');
const router = express.Router();
const { handleGenerateNewShortUrl, handleGetAnalytics, handleClickandRedirect } = require('../controllers/urlController');

router.route('/:shortId').get(handleClickandRedirect);
router.route('/').post(handleGenerateNewShortUrl);
router.route('/analytics/:shortId').get(handleGetAnalytics);
module.exports = router;