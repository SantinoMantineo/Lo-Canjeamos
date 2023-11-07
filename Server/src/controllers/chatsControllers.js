const { Chat } = require('../DB_config');

exports.createChat = async (userId, anotherUserId) => {
    try{
    const newChat = await Chat.create({
      user1Id: userId,
      user2Id: anotherUserId,
      // Otros campos del chat
    });
      return newChat; 
    }catch (error) {
        console.error("Error al crear el chat:", error)
        throw error;
    }
}

exports.getAllChats = async () => {
    try {
      const chats = await Chat.findAll();
  
      return chats;
    } catch (error) {
      throw error;
    }
  };