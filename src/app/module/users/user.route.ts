import express from 'express';
import auth from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../enums/user';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const userRouter = express.Router();

userRouter.post('/auth/signup', validateRequest(UserValidation.createUserZodSchema), UserController.createUser);
userRouter.get('/users/my-profile', auth( ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER), UserController.getUserProfile);  // checked - ok
userRouter.patch('/users/my-profile', auth( ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER), UserController.updateUserProfile); // checked -ok 
userRouter.get('/users/:id',  auth(ENUM_USER_ROLE.ADMIN),UserController.getSingleUser); // checked - ok
userRouter.delete('/users/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteSingleUser); // checked - ok 
userRouter.patch('/users/:id', auth(ENUM_USER_ROLE.ADMIN), validateRequest(UserValidation.updateUserZodSchema), UserController.updateSingleUser); // checked - ok
userRouter.get('/users', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUser); // checked - ok


export const UserRoutes = userRouter;