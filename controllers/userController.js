const User = require("../models/authModels");
const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json({ data: users });
  } catch (err) {
    console.log(err);
    return res.json({ message: "error", error: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    console.log("isi user:", user);

    if (!user) {
      res.status(401);
      return res.json({ status: "error", error: "invalid username/password" });
    }

    if (await bcrypt.compare(password, user.password)) {
      res.status(200);
      return res.json({
        status: "ok",
        message: "login success",
      });
    }

    return res.json({ data: user });
  } catch (err) {
    console.log(err);
    res.status(404);
    return res.json({ message: "error", error: err });
  }
};

exports.register = async (req, res) => {
  const { name, email, password: flatPassword } = req.body;
  const password = await bcrypt.hash(flatPassword, 5);

  try {
    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });
    return res.json({ message: "success create user" });
  } catch (err) {
    console.log(err);
    return res.json({ message: "error", error: err });
  }
};

exports.updateUser = async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = await User.update(password, { where: { id } });
    return res.json({ message: "success update", data: user });
  } catch (err) {
    console.log(err);
    return res.json({ message: "error", error: err });
  }
};
