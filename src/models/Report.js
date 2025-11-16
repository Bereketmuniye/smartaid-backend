const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        report_type: { type: String, required: true },
        reporting_period_start: { type: Date, required: true },
        reporting_period_end: { type: Date, required: true },
        file_path: { type: String, required: true },
        generated_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Report", reportSchema);
