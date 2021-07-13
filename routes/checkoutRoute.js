const express = require("express");
const {
  getcheckOut,
  checkOut,
  getcheckOutid,
} = require("../controllers/checkoutControllers");

const router = express.Router();

router.get("/", getcheckOut);
router.get("/getcheckoutid", getcheckOutid);
router.post("/makecheckout", checkOut);

module.exports = router;
