const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        contact: { type: String, required: true },
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
