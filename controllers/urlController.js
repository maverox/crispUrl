const Url = require('../models/Url');
const { nanoid } = require('nanoid');

async function handleGenerateNewShortUrl(req, res) {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    let shortId = nanoid(8);
    // console.log(shortId);
    const exists = await Url.findOne({ redirectedUrl: url });
    let response;
    if (exists) {
        response = exists;
        shortId = exists.shortId;
    } else {
        response = await Url.create({
            shortId: shortId,
            redirectedUrl: url,
            visitedHistory: [],
        });
    }
    return res.render('home', { shortId: shortId });
    return res.status(201).json(response);
}
async function handleClickandRedirect(req, res) {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId: shortId });
    if (!url) {
        return res.status(404).json({ error: 'URL not found' });
    }
    url.visitHistory.push({ timestamp: Date.now() });
    await url.save();
    return res.redirect(url.redirectedUrl);
}
async function handleGetAnalytics(req, res) {
    const { shortId } = req.params;
    console.log(req);
    const url = await Url.findOne({ shortId: shortId });
    if (!url) {
        return res.status(404).json({ error: 'URL not found' });
    }
    const analytics = {
        'user-agent': req.headers['user-agent'],
        language: req.headers['accept-language'],
        platform: req.headers['user-platform'],
        clickCount: url.visitHistory.length,
        clickHistory: url.visitHistory.map((visit) => visit.timestamp.toISOString().split('T')[0])
    }
    return res.json(
        analytics
    );
}
module.exports = { handleGenerateNewShortUrl, handleClickandRedirect, handleGetAnalytics };