const express = require('express');
const LoginRoute = express.Router();
const loginControllerr = require('../controllers/LoginController');

LoginRoute.post('/', loginControllerr.loginUser);
// LoginRoute.get('/', loginControllerr.getLoggedInUsers);

module.exports = {
    LoginRoute
};