const User = require('../models/User');
const { nanoid} = require('nanoid');
const {getUser, setUser} = require('../utils/auth');
const bcrypt = require('bcrypt');

async function   handleRegisterUser (req, res) {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({error: 'All fields are required'});
    }

    const newField = await User.create({
        username,
        email,
        password,
    })
    // const sessionId = nanoid(20);
    // setUser(sessionId, newField);
    // res.cookie('sid', sessionId);
    const token = setUser(newField);
    // res.cookie('sid', token);
    res.json({token});
    return res.redirect('/');
    // return res.status(201).json(newField);
}
async function handleLoginUser(req, res) {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({error: 'All fields are required'});
    }
    
    const userExists = await User.findOne({username});

    if (!userExists) {
        return res.render('signup',{error: 'Username does not exist'});
    } else if (await bcrypt.compare(userExists.password, password)) { 
        return res.render('signup', {error: 'Password is incorrect'});
    }
    // const sessionId = nanoid(20);
    // setUser(sessionId, userExists);
    // res.cookie('sid', sessionId);
    const token = setUser(userExists);
    // res.cookie('sid', token);
    res.json({token});
    return res.redirect('/');
}

module.exports = {handleRegisterUser, handleLoginUser};