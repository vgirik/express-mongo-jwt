'use strict';

/**
 * Module dependencies.
 */
//
const jwt = require('jsonwebtoken');
//
const userController = require('../controller/UserController');

/**
 * Middleware for JWT Validation
 * @param {*} options 
 * @returns 
 */
function validToken(options) {
    const opts = options || {}
    return function (req, resp, next) {
        if (`${process.env.CONSOLE_DEBUG}` == 'true')
            console.log(req.headers.authorization);
        if (excludedURL(req.originalUrl)) {
            next();
        } else {
            hasValidAuthorization(req, resp, next);
        }
    }
}

/**
 * To exclude end points from authentication
 */
function excludedURL(originalUrl) {
    if (`${process.env.CONSOLE_DEBUG}` == 'true')
        console.log(originalUrl)
    return originalUrl.includes('token') || originalUrl.includes('add-user');
}
/**
 * Method to validate JWT token against database token
 * @param {*} authHeader 
 * @param {*} resp 
 * @returns 
 */
function hasValidAuthorization(req, resp, next) {
    try {
        if (!req.headers.authorization || !req.headers.authorization.split(" ")[1]) {
            resp.status(401).json({ "message": "Missing autorization token.Unauthroized Call" })
        } else {
            var token = req.headers.authorization.split(" ")[1];
            if (`${process.env.CONSOLE_DEBUG}` == 'true')
                console.log(token);
            var dToken = jwt.verify(token, `${process.env.JWT_SECRETE}`);
            if (`${process.env.CONSOLE_DEBUG}` == 'true')
                console.log(dToken);
            validate(dToken.email, dToken.token, resp, next, req);
        }
    } catch (error) {
        log.error(error);
        resp.status(401).json({ "message": "Invalid Token" });
    } finally {
        return false;
    }
}

function validate(email, token, resp, next, req) {
    let user = userController.getUserByToken(email, token);
    user.then((data) => {
        if (`${process.env.CONSOLE_DEBUG}` == 'true')
            console.log(data);
        if (!data)
            resp.status(401).json({ "message": "Invalid Token" });
        else {
            if (req.originalUrl.includes(`${process.env.LOGOUT_END_POINT}`)) {
                const obj = userController.deleteToken(data);
                obj.then((data) => {
                    let x = data ? resp.status(200).json({ "message": "logout success" }) :
                        resp.status(500).json({ "message": "Server Error" })

                })

            } else {
                next();
            }
        }
    });
}

module.exports = { validToken }
