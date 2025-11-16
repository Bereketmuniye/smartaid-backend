const mongoose = require("mongoose");

const projectDonorSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donor",
        required: true,
    },
    allocated_amount: { type: Number, required: true },
});

module.exports = mongoose.model("ProjectDonor", projectDonorSchema);
