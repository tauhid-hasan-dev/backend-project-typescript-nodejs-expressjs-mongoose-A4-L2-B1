import express from 'express';
import { AdminRoutes } from '../app/module/admin/admin.route';
import { AuthRoutes } from '../app/module/auth/auth.route';
import { CowRoutes } from '../app/module/cows/cow.route';
import { OrderRoutes } from '../app/module/orders/order.route';
import { UserRoutes } from '../app/module/users/user.route';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/',
        route: UserRoutes
    },
    {
        path: '/',
        route: CowRoutes
    },
    {
        path: '/',
        route: OrderRoutes
    },
    {
        path: '/',
        route: AdminRoutes
    },
    {
        path: '/',
        route: AuthRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router