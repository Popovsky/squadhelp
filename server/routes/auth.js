const authRouter = require('express').Router();
const AuthController = require('./../controllers/authController');

authRouter.post('/sign-in', AuthController.signInUser);
authRouter.post('/sign-up', AuthController.signUpUser);
authRouter.post('/refresh', AuthController.refreshAuth);

module.exports = authRouter;
