const express = require('express');
const router = express.Router();

// Serve static files from the "views/home" directory on the root path ("/")
router.get('/', (req, res) => {
    return res.render('home');
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
