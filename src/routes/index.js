const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/ngos", require("./ngos"));
router.use("/donors", require("./donors"));
router.use("/projects", require("./projects"));
router.use("/expenses", require("./expenses"));
router.use("/reports", require("./reports"));
router.use("/compliance", require("./compliance"));

module.exports = router;
