const { Report } = require("../../models");
const upload = require("../../utils/fileUploader");
const { generatePDFReport } = require("../../services/reportService");

exports.createReport = async (req, res) => {
    try {
        let filePath = req.file ? req.file.path : null;
        if (!filePath) {
            // Auto-generate PDF
            filePath = await generatePDFReport(
                req.body.project,
                req.body.report_type,
            );
        }
        const report = new Report({
            ...req.body,
            file_path: filePath,
            generated_by: req.user.id,
        });
        await report.save();
        res.status(201).json(report);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
