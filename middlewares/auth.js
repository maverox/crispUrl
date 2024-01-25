const { getUser } = require("../utils/auth");

async function restrictToLoggedUserOnly(req, res, next) {

    // const sid = req.cookies?.sid;
    try {
        const sid = req.headers.authorization?.split(' ')[1];

        if (!sid) {
            return res.redirect('/login');
        }
        const user = getUser(sid);
        if (user) {
            req.user = user;
        } else {
            return res.redirect('/login');
        }
    } catch (error) {
        console.log(error);
    }
    next();
}

async function checkAuth(req, res, next) {

    // const sid = req.cookies?.sid;
    try {
        const sid = req.headers.authorization?.split(' ')[1];

        const user = getUser(sid);
        
        req.user = user;    
    } catch (error) {
        console.log(error);
    }
    next();
}

module.exports = { restrictToLoggedUserOnly, checkAuth };