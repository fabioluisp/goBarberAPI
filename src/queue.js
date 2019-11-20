import 'dotenv/config';

import Queue from './lib/Queue';

/**
 * esse arquivo é para poder ter o processamento das filas sendo
 * executado em outra instancia, outro comp/processador
 * separado da aplicação
 */

Queue.processQueue();
