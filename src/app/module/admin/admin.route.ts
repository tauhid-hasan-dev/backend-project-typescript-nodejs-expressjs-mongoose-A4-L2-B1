import express from 'express';
import { AdminController } from './admin.controller';
const router = express.Router();

router.post('/admins/create-admin',  AdminController.createAdmin);
router.post('/admins/login',  AdminController.loginAdmin);

export const AdminRoutes = router;
