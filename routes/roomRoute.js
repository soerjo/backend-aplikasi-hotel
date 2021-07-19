const express = require("express");
const {
  makeRoom,
  getRoomType,
  getRoombyId,
  updateRoom,
} = require("../controllers/roomControllers");

const router = express.Router();

router.post("/roomtype/", getRoomType);
router.get("/roombyid", getRoombyId);
router.post("/makeroom", makeRoom);
router.put("/updateroom", updateRoom);

module.exports = router;
