const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const DevRepo = require("../repositories/DevRepository");

const getDataFromGitHub = async github_username => {
  const resp = await axios.get(
    `https://api.github.com/users/${github_username}`
  );

  const { name = login, avatar_url, bio } = resp.data;

  return {
    name,
    avatar_url,
    bio
  };
};

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },
  async delete(request, response) {
    const github_username = request.params["github_username"];

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      return response.status(404).json({
        message: "NOT FOUND " + github_username
      });
    }

    const deleted = await dev.delete();
    if (deleted) {
      return response.json({
        message: "DELETED " + github_username,
        deleted
      });
    }
    return response.status(500).json({
      message: "Error deleting " + github_username
    });
  },
  async update(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    const { name, avatar_url, bio } = await getDataFromGitHub(github_username);
    const techArray = parseStringAsArray(techs);
    const location = DevRepo.getLocationPoint(longitude, latitude);

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      return response.status(404).json({
        message: "NOT FOUND " + github_username
      });
    }

    DevRepo.updateDev(
      name,
      github_username,
      bio,
      avatar_url,
      techArray,
      location
    );
    dev = await Dev.findOne({ github_username });

    return response.json({
      message: "updated " + github_username,
      updated: dev
    });
  },
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (dev) {
      return response.json({
        dev: dev
      });
    }

    const { name, avatar_url, bio } = await getDataFromGitHub(github_username);

    const techArray = parseStringAsArray(techs);

    const location = DevRepo.getLocationPoint(longitude, latitude);

    dev = await DevRepo.newDev(
      name,
      github_username,
      bio,
      avatar_url,
      techArray,
      location
    );

    return response.json({
      message: "saved " + github_username,
      created: dev
    });
  }
};
