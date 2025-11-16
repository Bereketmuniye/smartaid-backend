const mongoose = require("mongoose");
const { Project, Ngo } = require("../../models");

exports.createProject = async (req, res) => {
    try {
        let {
            name,
            description,
            start_date,
            end_date,
            total_budget,
            ngo: ngoInput,
        } = req.body;

        let ngoId;
        if (ngoInput) {
            if (
                typeof ngoInput === "string" &&
                !mongoose.Types.ObjectId.isValid(ngoInput)
            ) {
                const ngoDoc = await Ngo.findOne({ name: ngoInput.trim() });
                if (!ngoDoc) {
                    return res.status(400).json({
                        message: `NGO "${ngoInput}" not found`,
                    });
                }
                ngoId = ngoDoc._id;
            } else if (mongoose.Types.ObjectId.isValid(ngoInput)) {
                ngoId = ngoInput;
            } else {
                return res
                    .status(400)
                    .json({
                        message: "Invalid ngo: provide name or valid ObjectId",
                    });
            }
        } else {
            return res.status(400).json({ message: "NGO is required" });
        }

        const projectData = {
            name,
            description,
            start_date,
            end_date,
            total_budget,
            ngo: ngoId,
        };

        const project = new Project(projectData);
        await project.save();

        res.status(201).json(project);
    } catch (error) {
        console.error("Project creation error:", error);
        if (error.name === "ValidationError") {
            res.status(400).json({
                message: `Validation failed: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: "Internal server error during project creation",
            });
        }
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate(
            "ngo activities budgets",
        );
        res.json(projects);
    } catch (error) {
        console.error("Get projects error:", error);
        res.status(500).json({ message: "Failed to fetch projects" });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate(
            "ngo activities budgets donors",
        );
        if (!project)
            return res.status(404).json({ message: "Project not found" });
        res.json(project);
    } catch (error) {
        console.error("Get project error:", error);
        res.status(500).json({ message: "Failed to fetch project" });
    }
};
