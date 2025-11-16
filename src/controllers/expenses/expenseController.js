const { Expense } = require("../../models");
const upload = require("../../utils/fileUploader");
const { updateBudgetAfterExpense } = require("../../services/budgetService");

exports.createExpense = async (req, res) => {
    try {
        const expenseData = {
            ...req.body,
            project: req.body.projectId,
            activity: req.body.activityId,
            budget: req.body.budgetId,
            attachment: req.file ? req.file.path : null,
            created_by: req.user.id,
        };
        const expense = new Expense(expenseData);
        await expense.save();
        await updateBudgetAfterExpense(req.body.budgetId, req.body.amount);
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getExpensesByProject = async (req, res) => {
    try {
        const expenses = await Expense.find({
            project: req.params.projectId,
        }).populate("activity budget created_by");
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
