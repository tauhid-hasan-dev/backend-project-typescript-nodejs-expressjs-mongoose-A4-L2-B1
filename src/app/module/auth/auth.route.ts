import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/auth/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);


router.post(
  '/auth/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);


export const AuthRoutes = router;
