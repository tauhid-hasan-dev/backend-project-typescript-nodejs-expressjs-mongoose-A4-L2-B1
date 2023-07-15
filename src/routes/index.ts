import express from 'express'
import { UserRoutes } from '../app/module/users/user.route';
import { CowRoutes } from '../app/module/cows/cow.route';
import { OrderRoutes } from '../app/module/orders/order.route';

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
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router