const { Router } = require("express");
const routes = Router();
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

routes.get("/", DevController.index);
routes.post("/devs", DevController.store);
routes.put("/devs", DevController.update);
routes.delete("/devs/:github_username", DevController.delete);

routes.get("/search", SearchController.index);

module.exports = routes;
