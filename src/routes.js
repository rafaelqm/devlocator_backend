const { Router } = require("express");
const routes = Router();
const DevController = require("./controllers/DevController");

routes.get("/", DevController.index);

routes.post("/devs", DevController.store);

// routes.delete("/devs/:id", (request, response) => {
//   console.log(request.params);
//   return response.json({
//     message: "Deleting " + request.params["id"]
//   });
// });
module.exports = routes;
