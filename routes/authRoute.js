const express = require("express");
const {
  getUsers,
  login,
  register,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/users", getUsers);
router.post("/login", login);
router.post("/register", register);
router.post("/change", updateUser);

module.exports = router;
