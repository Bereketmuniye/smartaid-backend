const express = require("express");
const router = express.Router();
const ngoCtrl = require("../controllers/ngos/ngoController");
const auth = require("../middleware/auth");

router.post("/", auth, ngoCtrl.createNgo);
router.get("/",auth, ngoCtrl.getNgos);
router.get("/:id", auth, ngoCtrl.getNgoById);
router.get("/user/:userId", auth, ngoCtrl.getNgoByUser);

module.exports = router;
