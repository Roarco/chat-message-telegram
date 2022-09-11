const store = require('./store');

function addUser(name) {
    return new Promise((resolve, reject) => {
        if (!name) {
            console.error('[userController] No hay usuario');
            reject('Los datos son incorrectos');
            return false;
        }
        const user = {
            name,
        };
        store.add(user);
        resolve(user);
    });
}

function getUsers(filterID) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterID));
    });
}

function updateUser(id, name) {
    return new Promise(async (resolve, reject) => {
        if (!id || !name) {
            reject('Invalid data');
            return false;
        }
        const result = await store.update(id, name);
        resolve(result);
    });
}

function removeUser(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject('Id invalido');
            return false;
        }
        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            });
    });
}

module.exports = {
    addUser,
    getUsers,
    updateUser,
    removeUser,
};