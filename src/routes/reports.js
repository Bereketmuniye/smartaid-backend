const express = require("express");
const router = express.Router();
const reportCtrl = require("../controllers/reports/reportController");
const auth = require("../middleware/auth");
const upload = require("../utils/fileUploader");

router.post("/", auth, upload.single("file"), reportCtrl.createReport);

module.exports = router;
