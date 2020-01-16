const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;
    // buscar todos os devs num raio de 10 km
    console.log(request.query);
    // Filtrar por tecnologias
    techArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    response.json({
      devs,
      techs: techArray
    });
  }
};
