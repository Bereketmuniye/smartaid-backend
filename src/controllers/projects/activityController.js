const mongoose = require("mongoose");
const { Activity, User } = require("../../models");

exports.createActivity = async (req, res) => {
    console.log(req.body);
    try {
        const {
            name,
            description,
            start_date,
            end_date,
            budget_amount,
            responsible_user: userInput,
            projectId: bodyProjectId,
        } = req.body;
        let projectId =
            req.params.projectId || bodyProjectId || req.query.projectId;

        projectId = String(projectId).trim();

        if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
            return res
                .status(400)
                .json({
                    message:
                        "Valid project ID is required (in URL params, body.projectId, or query ?projectId=)",
                });
        }

        let userId;
        if (userInput) {
            if (
                typeof userInput === "string" &&
                !mongoose.Types.ObjectId.isValid(userInput)
            ) {
                const userDoc = await User.findOne({ name: userInput.trim() });
                if (!userDoc) {
                    return res.status(400).json({
                        message: `User "${userInput}" not found`,
                    });
                }
                userId = userDoc._id;
            } else if (mongoose.Types.ObjectId.isValid(userInput)) {
                userId = userInput;
            } else {
                return res
                    .status(400)
                    .json({
                        message:
                            "Invalid responsible_user: provide name or valid ObjectId",
                    });
            }
        } else {
            return res
                .status(400)
                .json({ message: "Responsible user is required" });
        }

        const activityData = {
            project: projectId,
            name,
            description,
            start_date,
            end_date,
            responsible_user: userId,
            budget_amount,
        };

        const activity = new Activity(activityData);
        await activity.save();

        res.status(201).json(activity);
    } catch (error) {
        console.error("Activity creation error:", error);
        if (error.name === "ValidationError") {
            res.status(400).json({
                message: `Validation failed: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: "Internal server error during activity creation",
            });
        }
    }
};

exports.getActivitiesByProject = async (req, res) => {
    try {
        let projectId = req.params.projectId || req.query.projectId;

        projectId = String(projectId).trim();

        if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
            return res
                .status(400)
                .json({ message: "Valid project ID is required" });
        }

        const activities = await Activity.find({ project: projectId }).populate(
            "responsible_user",
        );
        res.json(activities);
    } catch (error) {
        console.error("Get activities error:", error);
        res.status(500).json({ message: "Failed to fetch activities" });
    }
};
