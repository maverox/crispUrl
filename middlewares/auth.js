const { getUser } = require("../utils/auth");

function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.sid;
    req.user = null;
    if (!tokenCookie) {
        return next();
    }
    const user = getUser(tokenCookie);
    req.user = user;
    return next();
}

function restricToRole(roles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user) return res.status(401).redirect('/login');
        if (!roles.includes(user.role)) {
            return res.end('Unauthorized');
        }
        return next();
    }
}


// async function restrictToLoggedUserOnly(req, res, next) {

//     // const sid = req.cookies?.sid;
//     try {
//         const sid = req.headers.authorization?.split(' ')[1];

//         if (!sid) {
//             return res.redirect('/login');
//         }
//         const user = getUser(sid);
//         if (user) {
//             req.user = user;
//         } else {
//             return res.redirect('/login');
//         }
//     } catch (error) {
//         console.log(error);
//     }
//     next();
// }

// async function checkAuth(req, res, next) {

//     // const sid = req.cookies?.sid;
//     try {
//         const sid = req.headers.authorization?.split(' ')[1];

//         const user = getUser(sid);

//         req.user = user;    
//     } catch (error) {
//         console.log(error);
//     }
//     next();
// }

module.exports = { checkForAuthentication, restricToRole };