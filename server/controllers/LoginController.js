const { logger } = require('../config/logger');
// const LoginModel = require('../models/LoginModel');
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken')

const loginController = {
    loginUser: async (req, res) => {
        try {

            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });

            if (user) {
                if (user.password === password && user.email === email) {
                    // Password and email matches, login successful
                    const token = jwt.sign({ userId: user._id }, process.env.ACCESS_SECRET_KEY);
                    res.status(200).json({user, token: token });
                    logger.info('User logged in successfully');
                } else {
                    // Password does not match
                    res.status(401).json({ error: 'Invalid password or email' });
                    logger.error('Invalid password or email');
                }
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
                logger.error('Invalid login credentials');
            }
        } catch (error) {
            logger.error('Failed to login user', { error });
            res.status(500).json({ error: 'Failed to login user' });
        }
    },
};

module.exports = loginController;
