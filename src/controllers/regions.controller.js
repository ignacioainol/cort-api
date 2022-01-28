const { getRegions } = require("../models/Region");

const getAllRegions = async (req, res) => {
    try {
        const data = await getRegions();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    getAllRegions
}