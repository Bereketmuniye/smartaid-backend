const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) =>
        cb(null, process.env.UPLOAD_PATH || "./uploads"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype.startsWith("image/") ||
            file.mimetype === "application/pdf"
        ) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"), false);
        }
    },
});

module.exports = upload;
