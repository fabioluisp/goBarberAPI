import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {}; // uma fila apara cada background job

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      /**
       * chama a fila e vai acessar os parametros recebidos
       * o 'key' é necessário para o funcionamento
       * aí é necessario a configuracao do redis para a fila
       * foi criado um arquivo com essas configuracoes config/refis/js
       * Cada informação nas queues serão objetos
       * nesse objeto terá a fila (new Bee que está com o nome de bee, mas pode ser qq coisa)
       * e passa o handle tb como segundo parâmetro
       * A´estamos armazenando os jobs em this.queues
       * nele é armazenada a fila, que é esse 'bee'  e tb armazena
       * o handle, que é o processamentos dessa fila
       * onde recebera as informacoes e vai executar sua funcao, como enviar um email, por ex
       */
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  /**
   * metodo para adicionar novos trabalhos na fila
   * @param {*} queue  recebe a fila como param, ou seja, a qual fila sr´adicionado o novo job
   * ex: CancellationMail
   * @param {*} job recebe o job como parametro, com as informacoes do trabalho em si
   * ex: os dados do appointment
   * a cada novo email (novo job), ele tem q ser adicionao à
   * fila para ser processado
   */
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  /**
   * Vai realizar o processamento das filas
   * ao adicionar algo na fila, esse process vai processar esse job
   * processa pelo metodo 'process' do 'bee' recebendo o handle como parametro
   * que é a funcao q tem q ser processada
   */
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      // tratamento de error do bee.queue
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
