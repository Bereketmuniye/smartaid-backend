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
        const donors = await Donor.find();
        res.json(donors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
