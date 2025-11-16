const express = require("express");
const router = express.Router();
const complianceCtrl = require("../controllers/compliance/complianceController");
const auth = require("../middleware/auth");

router.post("/", auth, complianceCtrl.createComplianceCheck);
router.get("/project/:projectId", auth, complianceCtrl.getChecksByProject);

module.exports = router;
