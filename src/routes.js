import { Router } from 'express';

import User from './app/models/User';

import UserController from './app/controllers/UserController';

const routes = new Router();

// routes.get('/', async (req, res) => {
//   const user = await User.create({
//     name: 'Fabio Luis',
//     email: 'fabio@ggg.com',
//     password_hash: 'akjhdkjahs',
//   });

//   return res.json(user);
// });

routes.post('/users', UserController.store);

export default routes;
