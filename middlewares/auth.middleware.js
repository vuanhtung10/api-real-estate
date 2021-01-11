const Auth = require('../utils/auth');

const {TOKEN_EXPIRED, API_NOT_ALLOW} = require('../constants/message');

const checkAuth = async function(req, res, next) {
    try {
        const user = await Auth.getBearerToken(req);
        if(user == 'Token invalid') {         
            return res.status(401).send(TOKEN_EXPIRED);
        }
        req.user = user
        next();
    }
    catch (error) {
        return res.status(401).send(error);
    }
}

const checkAdmin = async function (req, res, next) {
    try {
        const user = await Auth.getBearerToken(req); 
        const { role, full_name } = user;
        if (role.name !== 'admin') {  
            return res.status(401).send(API_NOT_ALLOW);
        }
        next();
    }
    catch (error) {
        return res.status(401).send(error);
    }
}

module.exports = {
    checkAdmin,
    checkAuth
}