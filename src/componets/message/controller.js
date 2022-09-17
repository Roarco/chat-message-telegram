const config = require('../../config');
const store = require('./store');

const getMessages = async (query) => {
    return new Promise(async (resolve, reject) => {
        try{
            const messages = await store.list(query);
            resolve(messages);
        }catch(e){
            reject({
                message: "An internal error has ocurred",
                internal: `There was an error in the getMessages function: ${e}`,
                status: 500
            });
        }
    });
};

const addMessage = async (chat,user, message, file) => {
    return new Promise(async (resolve, reject) => {
        if (!chat || !user || !message) {
            reject({
                message: "Invalid data",
                internal: null,
                status: 400
            });
        } else {
            let fileUrl = '';

            if (file) {
                fileUrl = `http://${config.host}/app/files/${file.filename}`;
            }

            const fullMessage = {
                chat,
                user,
                message,
                date: new Date(),
                file:fileUrl
            };

            try {
                const newMessage = await store.add(fullMessage);
                resolve(newMessage);
            } catch (error) {
                reject({
                    message: "An internal error has ocurred",
                    internal: `There was an error in the addMessage function: ${error}`,
                    status: 500
                });
            }
        }
    });
}


const updateMessage = (id, message) => {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            reject({
                message: 'An invalid data has been sent',
                internal: `The id or message is invalid: ${id} - ${message}`,
                status: 400
            });
        }

        try {
            const updateMessage = await store.updateText(id, message);
            resolve(updateMessage);
        } catch (error) {
            reject({
                message: "An internal error has ocurred",
                internal: `There was an error in the updateMessage function: ${error}`,
                status: 500
            });
        }



    });
}

const deleteMessage = (id) => {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            reject({
                message: "An invalid data has been sent",
                internal: `The id is invalid: ${id}`,
                status: 400
            });
        }

        try{
            const deletedMessage = await store.remove(id);
            resolve(deletedMessage);

        }catch(error){
            reject({
                message: "An internal error has ocurred",
                internal: `There was an error in the deleteMessage function: ${error}`,
                status: 500
            });
        }
    });
};



module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
};