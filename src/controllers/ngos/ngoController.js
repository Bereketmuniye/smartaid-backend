const { Ngo } = require('../../models');

exports.createNgo = async (req, res) => {
    try {
        const ngo =  new Ngo(req.body);
        await ngo.save();
        res.status(201).json(ngo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getNgos = async (req, res) => {
    try {
        const ngos = await Ngo.find({ user: req.user._id })
        .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: ngos.length,
            data: ngos,
        });
    } catch (error) {
        console.error("Get ngos error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error during ngo fetching",
        });
    }
};

exports.getNgoById = async (req, res) => {
    try {
        const ngo = await Ngo.findById(req.params.id).populate('projects');
        if (!ngo) {
            return res.status(404).json({ error: 'NGO not found' });
        }
        res.status(200).json(ngo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNgoByUser = async (req, res) => {
    try {
        const ngo = await Ngo.findOne({ user: req.params.userId });
        if (!ngo) {
            return res.status(404).json({ error: 'NGO not found' });
        }
        res.status(200).json(ngo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
    