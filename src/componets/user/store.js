const Model = require("./model");

const addUser = async (user) => {
  try {
    const newUser = new Model(user);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

const getUsers = async (query) => {
  let filter = {};

  if (query.name) {
    filter.name = query.name;
  }

  try {
    const users = await Model.find(filter);
    return users;
  } catch (error) {
    throw new Error(error);
  }
};
const updateUser = async (id, chaenge) => {
  try {
    const user = await Model.findOneAndUpdate({ _id: id }, chaenge);
    const updatedUser = await Model.findOne({ _id: id });
    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};

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
