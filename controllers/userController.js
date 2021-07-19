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
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    console.log("isi yg di temukan:", user);

    if (!user) {
      res.status(401);
      return res.json({
        data: { error: "error", message: "invalid username/password" },
      });
    }

    const check = await bcrypt.compare(password, user.password);
    console.log(check);

    if (check) {
      res.status(200);
      const response = { id: user.id, name: user.name, email: user.email };
      return res.json({
        status: "ok",
        message: "login success",
        user: { ...response },
      });
    }

    res.status(401);
    return res.json({ message: "error", message: "invalid username/password" });
  } catch (err) {
    console.log(err);
    res.status(404);
    return res.json({ message: "error", error: err, user: "not response" });
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
    return res.json({ message: "success create user", user });
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
