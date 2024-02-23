'use strict';
/**
 * Module dependencies.
 */
const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
/**
 * Create user end point
 */
router.post('/add-user', userController.createUser);

/**
 * Create user end point
 */
router.post('/token', userController.getToken);

/**
 * Create user end point
 */
router.get('/list', userController.getUsers);
/**
 * Logout so that token will be delted
 */
router.delete('/`${process.env.LOGOUT_END_POINT}`', userController.deleteToken);

// Export middle ware
module.exports = router;
