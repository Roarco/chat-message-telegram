const Model = require("./model");

/* function addUser(name) {
    const myUser = new Model(name);
    myUser.save();
} */

const addUser = async (user) => {
    try{
        const newUser = new Model(user);
        await newUser.save();
        return newUser;
    }catch(error){
        throw new Error(error);
    }
};

/* async function getUsers(filterID) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterID !== null) {
            filter = { _id: filterID };
        }
        Model.find(filter)
            .populate('_id')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }
                resolve(populated);
            });
    });
} */

const getUsers = async (query) => {
    let filter = {};

    if (query.name) {
        filter .name = query.name;
    }

    try{
        const users = await Model.find(filter);
        return users;
    }catch(error){
        throw new Error(error);
    }
};

async function updateUser(id, name) {
    const foundUser = await Model.findOne({
        _id: id,
    });
    foundUser.name = name;
    const newUser = await foundUser.save();
    return newUser;
}

function removeUser(id) {
    return Model.deleteOne({
        _id: id,
    });
}

module.exports = {
    add: addUser,
    list: getUsers,
    update: updateUser,
    remove: removeUser,
};