const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (dev) {
      return response.json({
        dev: dev
      });
    }

    const resp = await axios.get(
      `https://api.github.com/users/${github_username}`
    );

    const { name = login, avatar_url, bio } = resp.data;

    const techArray = techs.split(",").map(tech => tech.trim());

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techArray,
      location
    });

    return response.json({
      message: "Creating " + request.body.github_username,
      created: dev
    });
  }
};
