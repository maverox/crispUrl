const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;


const setUser = (user) => {
    
    try {
        const token = jwt.sign(user.toJSON(), SECRET, { expiresIn: '3h' });
        return token;
    } catch (error) {
        console.log(`Cant sign jwt token: ${error}`);
    }
}

const getUser = (token) => {
    try {
        return jwt.verify(token, SECRET);
    } catch (error) {
        console.log(`Cant verify jwt token: ${error}`);
    }
}


module.exports = {
    setUser,
    getUser,
    
}
// const sessionIdToUser = new Map();

// const setUser = (sessionId, user) => {
//     return sessionIdToUser.set(sessionId, user);
// }

// const getUser = (sessionId) => {
//     return sessionIdToUser.get(sessionId);
// }

