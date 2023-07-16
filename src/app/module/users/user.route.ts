import express from 'express'
import { UserController } from './user.controller';
import validateRequest from '../../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';

const userRouter = express.Router();

userRouter.post('/auth/signup', validateRequest(UserValidation.createUserZodSchema), UserController.createUser);
userRouter.get('/users', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUser);
userRouter.get('/users/:id',  auth(ENUM_USER_ROLE.ADMIN),UserController.getSingleUser);
userRouter.delete('/users/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteSingleUser);
userRouter.patch('/users/:id', auth(ENUM_USER_ROLE.ADMIN), validateRequest(UserValidation.updateUserZodSchema),UserController.updateSingleUser);

export const UserRoutes = userRouter