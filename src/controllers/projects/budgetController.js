const mongoose = require("mongoose");
const { Budget } = require("../../models");

exports.createBudget = async (req, res) => {
    try {
        const { budget_line_code, budget_line_name, budget_line_description, budget_line_amount } = req.body;
        let projectId = req.params.projectId;

        // Coerce to string and trim for safety
        projectId = String(projectId || "").trim();

        if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
            return res
                .status(400)
                .json({
                    message: "Valid project ID is required (in URL params)",
                });
        }

        const budgetData = {
            project: projectId,
            budget_line_code,
            budget_line_name,
            budget_line_description,
            budget_line_amount,
        };

        const budget = new Budget(budgetData);
        await budget.save();

        res.status(201).json(budget);
    } catch (error) {
        console.error("Budget creation error:", error);
        if (error.name === "ValidationError") {
            res.status(400).json({
                message: `Validation failed: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: "Internal server error during budget creation",
            });
        }
    }
};

exports.getBudgetsByProject = async (req, res) => {
    try {
        // Temp debug logs
        console.log("Budget Get - req.params:", req.params);
        console.log("Budget Get - req.query:", req.query);

        let projectId = req.params.projectId || req.query.projectId;

        // Coerce to string and trim
        projectId = String(projectId || "").trim();
        console.log(
            "Budget Get - processed projectId:",
            projectId,
            "valid?",
            mongoose.Types.ObjectId.isValid(projectId),
        );

        if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
            return res
                .status(400)
                .json({
                    message:
                        "Valid project ID is required (in URL params or query ?projectId=)",
                });
        }

        const budgets = await Budget.find({ project: projectId });
        res.json(budgets);
    } catch (error) {
        console.error("Get budgets error:", error);
        res.status(500).json({ message: "Failed to fetch budgets" });
    }
};