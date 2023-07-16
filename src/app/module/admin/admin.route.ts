import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
const router = express.Router();

router.post('/admins/create-admin', validateRequest(AdminValidation.createAdminZodSchema), AdminController.createAdmin);
router.post('/admins/login',  AdminController.loginAdmin);

export const AdminRoutes = router;
