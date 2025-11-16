const mongoose = require("mongoose");
const { Role } = require("../models");

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    console.log("MONGODB_URI:", uri); // Debug
    if (!uri) {
        console.error(
            "ERROR: MONGODB_URI not set in .env. Add: MONGODB_URI=mongodb://localhost:27017/smartaid",
        );
        process.exit(1);
    }
    console.log("Using URI:", uri ? "SET" : "MISSING");

    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected");

        const existingRoles = await Role.find({
            name: { $in: ["admin", "user", "manager"] },
        });
        if (existingRoles.length < 3) {
            const rolesToSeed = [
                { name: "admin" },
                { name: "user" },
                { name: "manager" },
            ].filter(
                (role) => !existingRoles.some((er) => er.name === role.name),
            );
            if (rolesToSeed.length > 0) {
                await Role.insertMany(rolesToSeed);
                console.log(`${rolesToSeed.length} roles seeded`);
            }
        } else {
            console.log("All roles exist");
        }
    } catch (error) {
        console.error("MongoDB/seeding error:", error.message);
        process.exit(1);
    }
};

module.exports = { connectDB };
