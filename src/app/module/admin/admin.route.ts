import express from 'express';
import { AdminController } from './admin.controller';
const router = express.Router();

router.post('/admins/create-admin',  AdminController.createAdmin);

export const AdminRoutes = router;
