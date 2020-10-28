const authRouter = require('express').Router();
const AuthController = require('./../controllers/authController');

authRouter.post('/login', AuthController.login);
authRouter.post('/signup', AuthController.signUp);
authRouter.post('/refresh', AuthController.refresh);

module.exports = authRouter;
