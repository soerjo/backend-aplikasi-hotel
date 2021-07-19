const checkIn = require("../models/checkinModels");
const room = require("../models/roomModels");
const checkOut = require("../models/checkOutModels");

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
  const { id } = req.params;
  try {
    const pelanggan = await checkIn.findOne({ where: { id } });
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
  const updateRoom = {
    type: req.body.roomType,
    status: true,
  };

  if (req.body.name !== null) {
    try {
      await checkIn.create(save);
      await room.update(updateRoom, { where: { id: req.body.roomId } });
      return res.json({ message: "success checkIn" });
    } catch (err) {
      console.log(err);
      return res.json({ status: 400, message: "error", error: err });
    }
  }
  res.status(400);
  return res.json({
    status: 400,
    message: "error! data yang dimasukan tidak bisa null",
  });
};

//POST => /v1/api/editcheckin/
exports.editcheckin = async (req, res) => {
  const save = req.body;
  const { id, roomId, oldRoomId } = req.body;
  console.log("data masuk: ", save);
  const updateRoom = {
    status: true,
  };
  const updateOldRoom = {
    status: false,
  };

  try {
    const data = await checkIn.update(save, { where: { id } });
    await room.update(updateRoom, { where: { id: roomId } });
    await room.update(updateOldRoom, { where: { id: oldRoomId } });
    return res.json({ message: "success edit checkIn", data });
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.json({ message: "error", error: err });
  }
};

//DELETE => /v1/api/checkin/delcheckinid
exports.deletecheckin = async (req, res) => {
  console.log("delete user kepanggil", req.body);
  const { id, roomId, roomType } = req.body;
  const save = req.body;

  try {
    await checkIn.destroy({ where: { id } });
    await room.update(
      { type: roomType, status: false },
      { where: { id: roomId } }
    );
    const user = await checkOut.create(save);
    console.log("create checkout : ", user);

    res.status(200);
    return res.json({ mesage: "berhasil checkout..." });
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.json({ message: "error", error: err });
  }
};
