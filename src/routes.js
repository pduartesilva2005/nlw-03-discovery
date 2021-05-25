const { Router } = require("express");
const OrphanageController = require("./controllers/OrphanageController");

const routes = Router();

routes.get("/", OrphanageController.render);
routes.get("/create-orphanage", OrphanageController.create);
routes.post("/save-orphanage", OrphanageController.save);
routes.get("/orphanages", OrphanageController.index);
routes.get("/orphanage", OrphanageController.show);

module.exports = routes;
