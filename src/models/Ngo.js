const mongoose = require("mongoose");
const User = require("./User");

const ngoSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true },
);

ngoSchema.set("toObject", { virtuals: true });
ngoSchema.set("toJSON", { virtuals: true });


module.exports = mongoose.model("Ngo", ngoSchema);
