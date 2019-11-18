import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers could see notifications!!!' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    // este metodo faz com que o mongo já busque o registro e atualize
    // e com o 'new: true' ele já retorna o novo valor do registro
    const notification = await Notification.findByIdAndUpdate(
      req.params.id, // pega o id q foi passado como parametro da url
      { read: true }, // altera o campo 'read' para true
      { new: true } // retorna o novo valor do registro já alterado
    );

    return res.json(notification);
  }
}

export default new NotificationController();
