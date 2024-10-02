import { createBrowserRouter, RouteObject } from "react-router-dom";
import allRoutes from './allRoutes';

const routes: RouteObject[] = [...allRoutes];

const router = createBrowserRouter(routes);

export default router;