const Dev = require("../models/Dev");

module.exports = {
  async newDev(name, github_username, bio, avatar_url, techArray, location) {
    dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techArray,
      location
    });

    return dev;
  },
  async updateDev(name, github_username, bio, avatar_url, techArray, location) {
    dev = await Dev.updateOne(
      {
        github_username
      },
      {
        name,
        avatar_url,
        bio,
        techs: techArray,
        location
      }
    );

    return dev;
  },
  async deleteDev(github_username) {
    dev = await Dev.deleteOne(
      {
        github_username
      },
      function(err) {
        if (err) return handleError(err);
        // deleted at most one tank document
      }
    );

    return dev;
  },
  getLocationPoint(longitude, latitude) {
    return {
      type: "Point",
      coordinates: [longitude, latitude]
    };
  }
};
