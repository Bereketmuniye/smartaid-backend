const express = require("express");
const router = express.Router();
const donorCtrl = require("../controllers/donors/donorController");
const auth = require("../middleware/auth");


router.post("/", auth, donorCtrl.createDonor);
router.get("/", donorCtrl.getDonors);

module.exports = router;
