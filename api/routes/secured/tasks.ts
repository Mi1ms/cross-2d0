import { Router } from 'express';
import TaskController from '../../controllers/TaskController';

const routes = Router();

routes.get('/:id', TaskController.getAllById);
routes.post('/save', TaskController.save);
routes.delete('/:id', TaskController.delete);
routes.put('/:id', TaskController.update)

export default routes;