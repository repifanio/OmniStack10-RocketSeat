const mongose = require('mongoose');
const pointSchema = require('./utils/PointSchema');

const devSchema = new mongose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: pointSchema,
        index: '2dsphere'
    }
})

module.exports = mongose.model('Dev', devSchema);