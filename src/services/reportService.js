const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.generatePDFReport = async (projectId, reportType) => {
    const doc = new PDFDocument();
    const filePath = path.join(
        __dirname,
        "../../uploads",
        `report-${projectId}-${Date.now()}.pdf`,
    );
    doc.pipe(fs.createWriteStream(filePath));
    doc.text(`Report for Project ${projectId} - Type: ${reportType}`);
    doc.end();
    return filePath;
};
