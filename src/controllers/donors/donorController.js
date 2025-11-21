const { Donor } = require("../../models");

exports.createDonor = async (req, res) => {
    try {
        const donor = new Donor(req.body);
        await donor.save();
        res.status(201).json(donor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getDonors = async (req, res) => {
    try {
        const donors = await Donor.find({ user: req.user._id })
        .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: donors.length,
            data: donors,
        });
    } catch (error) {
        console.error("Get donors error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error during donor fetching",
        });
    }
};

exports.getDonorById = async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.id);
        if (!donor) {
            return res.status(404).json({ message: "Donor not found" });
        }
        res.json(donor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateDonor = async (req, res) => {
    try {
        const donor = await Donor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!donor) {
            return res.status(404).json({ message: "Donor not found" });
        }
        res.json(donor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteDonor = async (req, res) => {
    try {
        const donor = await Donor.findByIdAndDelete(req.params.id);
        if (!donor) {
            return res.status(404).json({ message: "Donor not found" });
        }
        res.json(donor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDonorByUser = async (req, res) => {
    try {
        const donor = await Donor.find({ user: req.params.id });
        if (!donor) {
            return res.status(404).json({ message: "Donor not found" });
        }
        res.json(donor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


