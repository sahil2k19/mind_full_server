const HomeSection = require("../database/models/HomeSection");


const addSection = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            msg: 'No data'
        });
    }
    try {
        const homeSection = new HomeSection(body);
        await homeSection.save();
        return res.json(homeSection);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const updateSection = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            msg: 'No data'
        });
    }
    try {
        const homeSection = await HomeSection.findByIdAndUpdate(body._id, body, { new: true });
        return res.json(homeSection);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const getSection = async (req, res) => {
    try {
        const homeSection = await HomeSection.find();
        return res.json(homeSection[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}



module.exports = {
    addSection,
    updateSection,
    getSection
}