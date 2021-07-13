const room = require("../models/roomModels");

//GET => /v1/api/room/roomtype
exports.getRoomType = async (req, res) => {
  const { type } = req.body;
  try {
    const kamar = await room.findAll({ where: { type } });
    const filterKamar = kamar.filter((room) => room.status === false);
    console.log("isi room tipe :", filterKamar);

    if (!kamar) {
      res.status(404);
      return res.json({ status: "not found", error: "phone number not found" });
    }

    res.status(200);
    return res.json({ data: filterKamar });
  } catch (err) {
    console.log(err);
    return res.json({ message: "error", error: err });
  }
};

//GET BY ID => /v1/api/room/roombyid
exports.getRoombyId = async (req, res) => {
  const { id } = req.body;
  try {
    const kamar = await room.findOne({ where: { id } });
    console.log("isi room:", kamar);

    if (!kamar) {
      res.status(404);
      return res.json({ status: "not found", error: "phone number not found" });
    }

    res.status(200);
    return res.json({ data: kamar });
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.json({ message: "error", error: err });
  }
};

//POST => /v1/api/room/makeroom
exports.makeRoom = async (req, res) => {
  const { type } = req.body;

  try {
    const user = await room.create({ type: type });
    return res.json({ message: "success checkIn" });
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.json({ message: "error", error: err });
  }
};

//PUT => /v1/api/room/updateroom
exports.updateRoom = async (req, res) => {
  const { id } = req.body;
  const updateData = req.body;
  try {
    const data = await room.update(updateData, { where: { id } });
    return res.json({ message: "success update room", data });
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.json({ message: "error", error: err });
  }
};
