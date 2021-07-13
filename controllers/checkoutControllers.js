const checkOut = require("../models/checkOutModels");

//GET => /v1/api/checkout/
exports.getcheckOut = async (req, res) => {
  try {
    const pelanggan = await checkOut.findAll();
    return res.json({ data: pelanggan });
  } catch (err) {
    console.log(err);
    return res.json({ message: "error", error: err });
  }
};

//GET BY ID => /v1/api/checkout/getcheckoutid
exports.getcheckOutid = async (req, res) => {
  const { id, phone } = req.body;
  try {
    const pelanggan = await checkOut.findOne({ where: { phone } });
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

//POST => /v1/api/checkout/makecheckout
exports.checkOut = async (req, res) => {
  const save = req.body;

  try {
    const user = await checkOut.create(save);
    return res.json({ message: "success checkOut" });
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.json({ message: "error", error: err });
  }
};
