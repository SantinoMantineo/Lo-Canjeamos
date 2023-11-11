const { Message, User } = require("../DB_config");
const messages = require("../models/messages");

exports.getAllMessages = async () => {
  try {
    const messages = await Message.findAll();

    return messages;
  } catch (error) {
    throw error;
  }
};

exports.getMessages = async (chatId) => {
    try {
      const messages = await Message.findAll({
        where: {
          chatId: chatId,
        },
      });
      return messages;
    } catch (error) {
      console.error("Error al obtener mensajes del chat:", error);
      return []
    }
  };

  exports.createMessage = async (chatId, userId, content) => {
    try {
      const newMessage = await Message.create({
        chatId,
        userId,
        content,
      });
  
      return newMessage;
    } catch (error) {
      console.error("Error al crear y guardar el mensaje:", error);
      throw error;
    }
  };