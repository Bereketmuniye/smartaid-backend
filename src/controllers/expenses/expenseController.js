const { Expense } = require("../../models");
const upload = require("../../utils/fileUploader");

exports.createExpense = async (req, res) => {
    try {
        const {
            projectId,
            activityId,
            budgetId,
            amount,
            remainingBalanceToSpend,
            reForcast,
            overUnderspend,
            actualFinancialYtd,
            recentFinancialYtd,
            expense_date,
        } = req.body;
        const expenseData = {
            project: projectId,
            activity: activityId,
            budget: budgetId,
            amount,
            remaining_balance_to_spend:
                remainingBalanceToSpend || 0,
            re_forcast: reForcast || 0,
            over_underspend: overUnderspend || 0,
            actual_financial_ytd: actualFinancialYtd || 0,
            recent_financial_ytd: recentFinancialYtd || 0,
            expense_date,
            attachment: req.file ? req.file.path : null,
            created_by: req.user.id,
        };
        const expense = new Expense(expenseData);
        await expense.save();
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

exports.getExpensesByProject = async (req, res) => {
    try {
        const expense = await Expense.find({ user: req.user._id,
        })
        .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: expense.length,
            data: expense,
        });
    } catch (error) {
        console.error("Get expenses error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error during expense fetching",
        });
    }
};
