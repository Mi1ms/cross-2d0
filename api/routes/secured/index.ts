import { Router } from 'express';
import tasks from './tasks';

const routes = Router();
routes.use('/tasks', tasks);

export default routes;