const express = require("express");
const router = express.Router();
const ngoCtrl = require("../controllers/ngos/ngoController");
const auth = require("../middleware/auth");

router.post("/", auth, ngoCtrl.createNgo);
router.get("/", ngoCtrl.getNgos);
router.get("/:id", ngoCtrl.getNgoById);

module.exports = router;
