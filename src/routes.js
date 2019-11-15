import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

// import User from './app/models/User';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// routes.get('/', async (req, res) => {
//   const user = await User.create({
//     name: 'Fabio Luis',
//     email: 'fabio@ggg.com',
//     password_hash: 'akjhdkjahs',
//   });

//   return res.json(user);
// });

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
// como este middleware vem após as duas rotas do post,
// ele nao vale para elas,
// mas valerá para todas as rotas posteriores
routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
