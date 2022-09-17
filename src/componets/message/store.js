const Model = require("./model");

/* function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
} */

// agregar un mensaje
const addMessage = async (message) => {
  try {
    const newMessage = new Model(message);
    const savedMessage = await newMessage.save();
    return savedMessage;
  } catch (e) {
    throw new Error(e);
  }
};

// obtener todos los mensajes
const getMessage = async (query) => {
  let filter = {};

  if (query) {
    query.chat ? (filter.chat = query.chat) : null;
    query.id ? (filter._id = query.id) : null;
  }

  try {
    const messages = await Model.find(filter).populate("user").exec();
    return messages;
  } catch (e) {
    throw new Error(e);
  }
};

const updateText = async (id, message) => {
  try {
    const foundMessage = await Model.findById(id);
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
  } catch (e) {
    throw new Error(e);
  }
};

const removeMessage = async (id) => {
  try {
    const deletedMessage = await Model.findByIdAndDelete(id);
    return deletedMessage;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  add: addMessage,
  list: getMessage,
  updateText: updateText,
  remove: removeMessage,
};
