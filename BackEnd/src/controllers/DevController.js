const axios = require('axios');
const Dev = require('../models/Dev');
const StringToArray = require('../utils/StringToArray');

module.exports = {

    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        console.log(github_username);

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;
            const techsArray = StringToArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location,
            })
        }

        return response.json(dev);
    },

    async update(request, response) {

        const { github_username = 'vazio' } = request.body;

        if (github_username != 'vazio')
            return response.send('Não é possível atualizar o nome de usuário no GitHub.');
        else {
            const dev = await Dev.findByIdAndUpdate(request.params.id, request.body, { new: true });
            return response.json(dev);
        }
    },

    async destroy(request, response) {
        await Dev.findByIdAndRemove(request.params.id);

        return response.send();
    }
}