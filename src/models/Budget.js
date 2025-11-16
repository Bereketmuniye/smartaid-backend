const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        category: { type: String, required: true },
        allocated_amount: { type: Number, required: true },
        disbursed_amount: { type: Number, default: 0 },
        balance: { type: Number, default: 0 },
    },
    { timestamps: true },
);

// Set initial balance
budgetSchema.pre("save", function (next) {
    if (this.isNew) this.balance = this.allocated_amount;
    next();
});

module.exports = mongoose.model("Budget", budgetSchema);
