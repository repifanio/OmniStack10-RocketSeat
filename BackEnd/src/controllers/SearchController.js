const Dev = require('../models/Dev');
const StringToArray = require('../utils/StringToArray');

module.exports = {
    async index(request, response) {

        const { longitude, latitude, techs } = request.query;
        const techsArray = StringToArray(techs);

        const dev = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({ dev })
    }
}