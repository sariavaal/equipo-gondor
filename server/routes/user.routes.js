const express = require('express');
const userController = require('../controllers/user.controller');

const userRouter = express.Router();
//api/user/register || api/user/login
userRouter.post('/register', userController.createUser);
userRouter.post('/login', userController.loginUser);

module.exports = userRouter