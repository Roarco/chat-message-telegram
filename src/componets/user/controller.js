const store = require('./store');

/* function addUser(name) {
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
} */

const addUser = (name,email,password) => {
    return new Promise(async (resolve, reject) => {
        //Name validation
        if (!name || name.length < 4) {
            reject({
                message: 'Invalid name',
                internal: null,
                status: 400,
            });
        }

        //Email validation
        else if (!email || !email.includes('@')) {
            reject({
                message: 'Invalid email',
                internal: null,
                status: 400,
            });
        }

        //Password validation
        else if (!password || password.toString().length < 4) {
            reject({
                message: 'Invalid password',
                internal: null,
                status: 400,
            });
        }

        //If all validations are passed
        else {
            const newUser = {
                name,
                email,
                password,
                date : new Date(),
            };

            try{
                const user = await store.add(newUser);
                resolve(user);
            }catch(e){
                reject({
                    message: 'Internal error',
                    internal:`Something went wrong with the user store (addUser) \n ${err.message}`,
                    status: 500,
                });
            }
        }
    });
}

/* function getUsers(filterID) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterID));
    });
}
 */

const getUsers = (query) => {
    return new Promise(async (resolve, reject) => {
        try{
            const users = await store.list(query);
            resolve(users);
        }catch(e){
            reject({
                message: 'Internal error',
                internal: `Something went wrong with the user store (getUsers) \n ${err.message}`,
                status: 500,
            });
        }
    });
};


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

/* function removeUser(id) {
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
} */

const removeUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        if(!id){
            reject({
                message: 'Invalid id',
                internal: null,
                status: 400,
            });
        }else{
            try{
                const deleteUser = await store.remove(id);
                if(deleteUser){
                    resolve(deleteUser);
                }
                 //If the user is not found
                reject({
                    message: 'User not found',
                    internal: null,
                    status: 404,
                });
            }catch(e){
                reject({
                    message: 'Internal error',
                    internal: `Something went wrong with the user store (removeUser) \n ${err.message}`,
                    status: 500,
                });
            }
        }
    });
};

module.exports = {
    addUser,
    getUsers,
    updateUser,
    removeUser,
};