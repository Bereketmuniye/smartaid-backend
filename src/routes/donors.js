const express = require("express");
const router = express.Router();
const donorCtrl = require("../controllers/donors/donorController");
const auth = require("../middleware/auth");


router.post("/", auth, donorCtrl.createDonor);
router.get("/", donorCtrl.getDonors);
router.get("/:id", donorCtrl.getDonorById);
router.put("/:id", donorCtrl.updateDonor);
router.delete("/:id", donorCtrl.deleteDonor);
router.get("/user/:id", donorCtrl.getDonorByUser);

module.exports = router;
