const Model = require("./model");

const addChat = (users) => {
    const chat = new Model(users);
    return chat.save();
}

const listChats = (userId) => {
    let filter = {};
    if (userId) {
        filter = {
            users: userId,
        };
    }
    return Model.find(filter)
        .populate("users")
        .exec();
};

module.exports = {
    add: addChat,
    list: listChats,
};