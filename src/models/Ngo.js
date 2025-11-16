const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
    },
    { timestamps: true },
);

ngoSchema.virtual("projects", {
    ref: "Project",
    localField: "_id",
    foreignField: "ngo",
});
ngoSchema.set("toObject", { virtuals: true });
ngoSchema.set("toJSON", { virtuals: true });


module.exports = mongoose.model("Ngo", ngoSchema);
