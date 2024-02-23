'use strict';

/**
 * Module dependencies.
 */
//
const User = require('../model/User');
//
const jwt = require('jsonwebtoken');
//
const bcrypt = require('bcrypt');
//
const { v4: uuid } = require('uuid');


/**
 * Create User
 */
const createUser = async (req, resp) => {
  try {
    let user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, 10);
    user.token = uuid();
    if (`${process.env.CONSOLE_DEBUG}` == 'true')
      console.log(user.toJSON());
    await user.save();
    return resp.status(200).json(user);
  } catch (error) {
    console.error("Error in saving User", error);
    return resp.status(500).json(error);
  }
}

/**
 * get JWT Token
 */

const getToken = async (req, resp) => {
  try {
    const user = await User.findOne({
      "email": req.body.email
    });
    if (!user) {
      return resp.status(404).json({ "message": "User Notfound!" })
    }
    const isValidPwd = bcrypt.compareSync(req.body.password, user.password);
    if (!isValidPwd) {
      return resp.status(401).json({ "message": "Password is incorrect" });
    }
    const jwtToken = jwt.sign({
      id: user.id,
      email: user.email,
      token: user.token
    }, `${process.env.JWT_SECRETE}`, { expiresIn: 36000 });
    resp.status(200).json({ "AuthentionToken": jwtToken });
  } catch (error) {
    console.log("Error in getting JWT", error);
    return resp.status(500).json(error);
  }
}
/**
 * List all users
 * @param {*} req 
 * @param {*} resp 
 * @returns 
 */
const getUsers = async (req, resp) => {
  try {
    const users = await User.find(
    ).select("-password -token");
    resp.status(200).json(users);
  } catch (error) {
    console.error("Error in getting users", error);
    return resp.status(500).json(error);
  }
}
/**
 * Function is use to validate the token
 * @param {*} id 
 * @param {*} token 
 * @returns 
 */
const getUserByToken = async (email, token) => {
  if (`${process.env.CONSOLE_DEBUG}` == 'true')
    console.log(email + " " + token);
  const user = await User.findOne({
    "token": token,
    "email": email
  });
  return user;
}
/**
 * To renew token, so that old token is not valid any more
 * @param {*} user 
 * @returns 
 */
const deleteToken = async (user) => {
  try {
    if (`${process.env.CONSOLE_DEBUG}` == 'true')
      console.log(user);
    return await User.findOneAndUpdate({ "token": user.token }, { "token": uuid() }, {
      new: true
    });
  } catch (error) {
    console.error(error);
    return null;
  }

}
// Export modules
module.exports = { createUser, getToken, getUsers, getUserByToken, deleteToken }