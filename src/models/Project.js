const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        ngo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ngo",
            required: true,
        },
        name: { type: String, required: true },
        description: { type: String, required: true },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
        total_budget: { type: Number, required: true },
        status: {
            type: String,
            enum: ["active", "completed", "paused"],
            default: "active",
        },
    },
    { timestamps: true },
);

projectSchema.virtual('budgets', {
    ref: 'Budget',
    localField: '_id',
    foreignField: 'project',
});
projectSchema.virtual('activities', {
    ref: 'Activity',
    localField: '_id',
    foreignField: 'project',
});
projectSchema.virtual('donors', {
    ref: 'ProjectDonor',
    localField: '_id',
    foreignField: 'project',
});
projectSchema.set('toObject', { virtuals: true });
projectSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Project", projectSchema);
