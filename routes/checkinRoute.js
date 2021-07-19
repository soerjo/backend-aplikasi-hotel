const express = require("express");
const {
  checkin,
  getcheckin,
  getcheckinid,
  deletecheckin,
  editcheckin,
} = require("../controllers/checkInControllers");
const { updateRoom } = require("./roomRoute");

const router = express.Router();

router.post("/", checkin);
router.post("/editcheckin", editcheckin);
router.get("/getcheckin", getcheckin);
router.get("/getcheckinid/:id", getcheckinid);
router.delete("/delcheckinid", deletecheckin);

module.exports = router;
