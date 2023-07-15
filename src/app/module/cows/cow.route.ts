import express from 'express'
import { CowValidation } from './cow.validation';
import validateRequest from '../../../middlewares/validateRequest';
import { CowController } from './cow.controller';

const cowRouter = express.Router();

cowRouter.post('/cows', validateRequest(CowValidation.createCowZodSchema), CowController.createCow);
cowRouter.get('/cows', CowController.getAllCow)
cowRouter.get('/cows/:id', CowController.getSingleCow)
cowRouter.delete('/cows/:id', CowController.deleteSingleCow)
cowRouter.patch('/cows/:id', validateRequest(CowValidation.updateCowZodSchema),CowController.updateSingleCow)

export const CowRoutes = cowRouter;