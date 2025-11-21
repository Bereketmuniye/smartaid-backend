const { required } = require("joi");
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        donor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Donor",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: { type: String, required: true },
        type_of_fund: { type: String, required: true },
        financial_year: { type: Date, required:true },
        month: { type: Date, required:false },
        country: { type: String, required:false },
        project_number: { type: String, required: true },
        theme: { type: String, required: true },
        donor_currency: { type: String, required: true },
        current_value_in_donor_currency: { type: Number, required: true },
        number_of_month: { type: Number, required: false },
        description: { type: String, required: true },
        start_date: { type: Date, required: true },
        project_duration: { type: Number, required: false },
        end_date: { type: Date, required: false },
        total_budget: { type: Number, required: true },
        status: {
            type: String,
            enum: ["active", "Pipeline", "Closed", "Cancelled", "On Hold", "Draft","Archieved"],
            default: "active",
        },
        project_code: { type: String, required: true },
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
    foreignField: 'donor',
});
projectSchema.set('toObject', { virtuals: true });
projectSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Project", projectSchema);
