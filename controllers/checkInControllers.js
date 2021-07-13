const checkIn = require("../models/checkinModels");
const {
  makeRoom,
  getRoomType,
  getRoombyId,
} = require("../controllers/roomControllers");

//GET => /v1/api/checkin/getcheckin
exports.getcheckin = async (req, res) => {
  try {
    const pelanggan = await checkIn.findAll();
    return res.json({ data: pelanggan });
  } catch (err) {
    console.log(err);
    return res.json({ message: "error", error: err });
  }
};

//GET BY ID => /v1/api/checkin/getcheckinid
exports.getcheckinid = async (req, res) => {
  const { id, phone } = req.body;
  try {
    const pelanggan = await checkIn.findOne({ where: { phone } });
    console.log("isi checkin:", pelanggan);

    if (!pelanggan) {
      res.status(404);
      return res.json({ status: "not found", error: "phone number not found" });
    }

    res.status(200);
    return res.json({ data: pelanggan });
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.json({ message: "error", error: err });
  }
};

//POST => /v1/api/checkin/
exports.checkin = async (req, res) => {
  const save = req.body;

  try {
    const user = await checkIn.create(save);
    return res.json({ message: "success checkIn" });
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.json({ message: "error", error: err });
  }
};

//DELETE => /v1/api/checkin/delcheckinid
exports.deletecheckin = async (req, res) => {
  console.log("delete user kepanggil");
  const { id } = req.body;

  try {
    const pelanggan = await checkIn.destroy({ where: { id } });
    console.log("isi checkin:", pelanggan);

    if (!pelanggan) {
      res.status(404);
      return res.json({ status: "not found", error: "phone number not found" });
    }

    res.status(200);
    return res.json({ data: pelanggan });
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.json({ message: "error", error: err });
  }
};
