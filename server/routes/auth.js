const authRouter = require('express').Router();
const validateBody = require('../middlewares/validateBody');
const ValidationSchemas = require('../validation/schemas');
const AuthController = require('./../controllers/authController');

authRouter.post(
  '/login',
  validateBody(ValidationSchemas.loginSchema),
  AuthController.login
);

const validateBodyOnSignUp = validateBody(ValidationSchemas.signUpSchema);

authRouter.post('/signup', validateBodyOnSignUp, AuthController.signUp);

authRouter.post('/refresh', AuthController.refresh);

module.exports = authRouter;
