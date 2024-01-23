const express = require('express');
const Url = require('../models/Url');
const router = express.Router();

// Serve static files from the "views/home" directory on the root path ("/")
router.get('/', async (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    const allUrls = await Url.find({createdBy: req.user._id})
    .populate('createdBy', 'username');
    console.log(allUrls);
    return res.render('home', {urls: allUrls});
})

// Serve static files from the "views/signup" directory on the "/signup" path
router.get('/signup', (req, res) => {
    return res.render('signup');
})
// Serve static files from the "views/login" directory on the "/login" path
router.get('/login', (req, res) => {
    return res.render('login');
})

module.exports = router;
