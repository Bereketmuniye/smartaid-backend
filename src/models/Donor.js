const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        level1: { type: String, required: true },
        level2: { type: String, required: true },
        name: { type: String, required: true },
        donor_reporting_category: { type: String, required: true },
        budget_heading: { type: String, required: true },
        amount: { type: Number, required: true },
        donor_type: { type: String, required: true },
    },
    { timestamps: true },
);

donorSchema.virtual("projects", {
    ref: "ProjectDonor",
    localField: "_id",
    foreignField: "donor",
});

module.exports = mongoose.model("Donor", donorSchema);
