const { getUser } = require("../utils/auth");

async function restrictToLoggedUserOnly(req, res, next) {

    const sid = req.cookies?.sid;
    if (!sid) {
        return res.redirect('/login');
    }
    const user = getUser(sid);
    if (user) {
        req.user = user;
    } else {
        return res.redirect('/login');
    }
    next();
}

async function checkAuth(req, res, next) {

    const sid = req.cookies?.sid;
    const user = getUser(sid);

    req.user = user;

    next();
}

module.exports = { restrictToLoggedUserOnly, checkAuth};