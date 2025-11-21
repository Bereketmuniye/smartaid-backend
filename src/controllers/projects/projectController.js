const mongoose = require("mongoose");
const { Project, Donor } = require("../../models");


exports.createProject = async (req, res) => {
    try {
        let {
            name,
            donor: donorInput,
            user: userInput,
            type_of_fund,
            financial_year,
            month,
            country,
            project_number,
            theme,
            donor_currency,
            current_value_in_donor_currency,
            number_of_month,
            description,
            start_date,
            project_duration,
            end_date,
            total_budget,
            status,
            project_code,
        } = req.body;

        let donorId;
        if (donorInput) {
            if (
                typeof donorInput === "string" &&
                !mongoose.Types.ObjectId.isValid(donorInput)
            ) {
                const donorDoc = await Donor.findOne({ name: donorInput.trim() });
                if (!donorDoc) {
                    return res.status(400).json({
                        message: `Donor "${donorInput}" not found`,
                    });
                }
                donorId = donorDoc._id;
            } else if (mongoose.Types.ObjectId.isValid(donorInput)) {
                donorId = donorInput;
            } else {
                return res
                    .status(400)
                    .json({
                        message: "Invalid ngo: provide name or valid ObjectId",
                    });
            }
        } else {
            return res.status(400).json({ message: "Donor is required" });
        }

        const projectData = {
            donor: donorId,
            user: userInput,
            name,
            type_of_fund,
            financial_year,
            month,
            country,
            project_number,
            theme,
            donor_currency,
            current_value_in_donor_currency,
            number_of_month,
            description,
            start_date,
            project_duration,
            end_date,
            total_budget,
            status,
            project_code,
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
        const projects = await Project.find({ user: req.user._id }).populate(
            "donor user activities budgets",
        )
        .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });
    } catch (error) {
        console.error("Get projects error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error during project fetching",
        });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate(
            "donor user activities budgets donors",
        );
        if (!project)
            return res.status(404).json({ message: "Project not found" });
        res.status(200).json({
            success: true,
            count: project.length,
            data: project,
        });
    } catch (error) {
        console.error("Get project error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error during project fetching",
        });
    }
};

exports.getProjectsByDonor = async (req, res) => {
    try {
        const projects = await Project.find({ donor: req.params.donorId }).populate(
            "donor user activities budgets",
        );
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });
    } catch (error) {
        console.error("Get projects by donor error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error during project fetching",
        });
    }
};

exports.getProjectsByUser = async (req, res) => {
    try {
        const projects = await Project.find({ user: req.params.userId }).populate(
            "donor user activities budgets",
        );
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });
    } catch (error) {
        console.error("Get projects by user error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error during project fetching",
        });
    }
};

