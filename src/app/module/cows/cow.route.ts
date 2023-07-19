import express from 'express';
import auth from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../enums/user';
import { CowController } from './cow.controller';
import { CowValidation } from './cow.validation';

const cowRouter = express.Router();

cowRouter.get('/cows/:id', auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN), CowController.getSingleCow) // checked - ok
cowRouter.delete('/cows/:id',auth(ENUM_USER_ROLE.SELLER), CowController.deleteSingleCow) // checked - ok
cowRouter.patch('/cows/:id', auth(ENUM_USER_ROLE.SELLER), validateRequest(CowValidation.updateCowZodSchema),CowController.updateSingleCow) // checked - ok
cowRouter.post('/cows',auth(ENUM_USER_ROLE.SELLER), validateRequest(CowValidation.createCowZodSchema), CowController.createCow); // checked - ok
cowRouter.get('/cows',auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN), CowController.getAllCow) // checked - ok

export const CowRoutes = cowRouter;