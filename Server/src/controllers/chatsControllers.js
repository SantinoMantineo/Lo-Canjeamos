const { Chat, User } = require('../DB_config');

exports.getChatById = async (id) => {
    try {
      const chat = await Chat.findByPk(id);
  
      if (!chat) {
        throw new Error('Chat not found');
      }
  
      return chat;
    } catch (error) {
      throw error;
    }
  };