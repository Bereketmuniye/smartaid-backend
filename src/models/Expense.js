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
        description: { type: String, required: true },
        amount: { type: Number, required: true },
        attachment: { type: String },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Expense", expenseSchema);
