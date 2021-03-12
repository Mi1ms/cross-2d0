import { Router } from 'express';
import auth from './auth';
import secured from './secured';

const routes = Router();
routes.use('/auth', auth);
routes.use('/', secured);

export default routes;