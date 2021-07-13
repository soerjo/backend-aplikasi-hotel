const express = require("express");
const {
  checkin,
  getcheckin,
  getcheckinid,
  deletecheckin,
} = require("../controllers/checkInControllers");

const router = express.Router();

router.post("/", checkin);
router.get("/getcheckin", getcheckin);
router.get("/getcheckinid", getcheckinid);
router.delete("/delcheckinid", deletecheckin);

module.exports = router;
