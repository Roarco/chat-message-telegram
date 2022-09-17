const express = require("express");
const response = require("../../network/response");
const router = express.Router();
const controller = require("./controller");

router.get("/", async (req, res) => {
  const query = req.query;

  try {
    const users = await controller.getUsers(query);
    response.succes(req, res, "users were found", 200, users);
  } catch (e) {
    response.error(req, res, e.message, e.status, e.internal);
  }
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await controller.addUser(name, email, password);
    response.succes(req, res, "User created", 201, newUser);
  } catch (err) {
    response.error(req, res, err.message, err.status, err.internal);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const user = await controller.updateUser(id, body);

    if (user === null) {
      response.error(req, res, "User not found", 404, "User not found");
    } else {
      response.succes(req, res, "User updated", 200, user);
    }
  } catch (err) {
    response.error(req, res, err.message, err.status, err.internal);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await controller.removeUser(id);
    response.succes(req, res, `User ${id} deleted`, 200, deletedUser);
  } catch (err) {
    response.error(req, res, err.message, err.status, err.internal);
  }
});

module.exports = router;
