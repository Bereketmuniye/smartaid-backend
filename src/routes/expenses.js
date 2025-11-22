const express = require("express");
const router = express.Router();
const expenseCtrl = require("../controllers/expenses/expenseController");
const auth = require("../middleware/auth");
const upload = require("../utils/fileUploader");

router.post("/", auth, expenseCtrl.createExpense);
router.get("/", auth, expenseCtrl.getExpensesByProject);

module.exports = router;
