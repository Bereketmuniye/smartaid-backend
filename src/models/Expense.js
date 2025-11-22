const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },

        activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
        budget: { type: mongoose.Schema.Types.ObjectId, ref: "Budget" },
        expense_date: { type: Date, required: true },
        amount: { type: Number, required: true },
        remaining_balance_to_spend: { type: Number, required: true },
        re_forcast: { type: Number, required: true },
        over_underspend: { type: Number, required: true },
        actual_financial_ytd: { type: Number, required: true },
        recent_financial_ytd: { type: Number, required: true },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Expense", expenseSchema);
