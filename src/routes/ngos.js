const express = require("express");
const router = express.Router();
const ngoCtrl = require("../controllers/ngos/ngoController");
const auth = require("../middleware/auth");

router.post("/", auth, ngoCtrl.createNgo);
router.get("/", ngoCtrl.getNgos);
router.get("/:id", ngoCtrl.getNgoById);
router.get("/user/:userId", auth, ngoCtrl.getNgoByUser);

module.exports = router;
