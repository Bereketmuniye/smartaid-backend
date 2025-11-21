const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        budget_line_code: { type: String, required: true },
        budget_line_name: { type: String, required: true },
        budget_line_description: { type: String, required: true },
        budget_line_amount: { type: Number, required: true },
        balance: { type: Number, default: 0 },
    },
    { timestamps: true },
);


// Set initial balance
budgetSchema.pre("save", function (next) {
    if (this.isNew) this.balance = this.budget_line_amount;
    next();
});

module.exports = mongoose.model("Budget", budgetSchema);
