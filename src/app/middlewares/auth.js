import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided!!!' });
  }
  // console.log(authHeader);

  // colocando apenas uma ' , ' virgula como parametro na
  // desestruturação, se descarta aquele parametro
  // neste caso, descartou o "bearer" e manteve o "token"
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid!!!' });
  }
};
