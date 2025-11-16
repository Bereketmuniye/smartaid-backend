const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        name: { type: String, required: true },
        description: { type: String, required: true },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
        responsible_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        budget_amount: { type: Number, required: true },
    },
    { timestamps: true },
);

activitySchema.virtual("expenses", {
    ref: "Expense",
    localField: "_id",
    foreignField: "activity",
});
activitySchema.set("toObject", { virtuals: true });
activitySchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Activity", activitySchema);
