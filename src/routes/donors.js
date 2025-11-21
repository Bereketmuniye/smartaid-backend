const express = require("express");
const router = express.Router();
const donorCtrl = require("../controllers/donors/donorController");
const auth = require("../middleware/auth");


router.post("/", auth, donorCtrl.createDonor);
router.get("/",auth, donorCtrl.getDonors);
router.get("/:id",auth, donorCtrl.getDonorById);
router.put("/:id",auth, donorCtrl.updateDonor);
router.delete("/:id",auth, donorCtrl.deleteDonor);
router.get("/user/:id",auth, donorCtrl.getDonorByUser);

module.exports = router;
