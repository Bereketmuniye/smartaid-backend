const mongoose = require("mongoose");

const complianceSchema = new mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        check_type: { type: String, required: true },
        status: {
            type: String,
            enum: ["passed", "failed", "pending"],
            default: "pending",
        },
        notes: { type: String },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("ComplianceCheck", complianceSchema);
