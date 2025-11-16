const express = require("express");
const router = express.Router();
const expenseCtrl = require("../controllers/expenses/expenseController");
const auth = require("../middleware/auth");
const upload = require("../utils/fileUploader");

router.post("/", auth, upload.single("attachment"), expenseCtrl.createExpense);
router.get("/project/:projectId", auth, expenseCtrl.getExpensesByProject);

module.exports = router;
