const { ComplianceCheck } = require("../../models");

exports.createComplianceCheck = async (req, res) => {
    try {
        const check = new ComplianceCheck({
            ...req.body,
            project: req.body.projectId,
            created_by: req.user.id,
        });
        await check.save();
        res.status(201).json(check);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getChecksByProject = async (req, res) => {
    try {
        const checks = await ComplianceCheck.find({
            project: req.params.projectId,
        }).populate("created_by");
        res.json(checks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
