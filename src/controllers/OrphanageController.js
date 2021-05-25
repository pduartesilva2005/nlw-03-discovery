const Database = require("../database/init");
const Orphanage = require("../models/Orphanage");

module.exports = {
  render(request, response) {
    return response.render("index");
  },

  async index(request, response) {
    try {
      const database = await Database;

      const orphanages = await database.all("SELECT * FROM orphanages");

      return response.render("orphanages-map", { orphanages });
    } catch (err) {
      console.log(err);

      return response.send("Erro no banco de dados");
    }
  },

  async show(request, response) {
    const { id } = request.query;

    try {
      const database = await Database;

      const results = await database.all(
        `SELECT * FROM orphanages WHERE id = "${id}"`
      );

      const orphanage = results[0];

      orphanage.images = orphanage.images.split(",");
      orphanage.firstImage = orphanage.images[0];

      if (orphanage.open_on_weekends == "0") {
        orphanage.open_on_weekends = false;
      } else {
        orphanage.open_on_weekends = true;
      }

      return response.render("orphanage", { orphanage });
    } catch (err) {
      console.log(err);

      return response.send("Erro no banco de dados!");
    }
  },

  create(request, response) {
    return response.render("create-orphanage");
  },

  async save(request, response) {
    const fields = request.body;

    if (Object.values(fields).includes("")) {
      return response.send("Todos os campos devem ser preenchidos!");
    }

    try {
      const database = await Database;

      await Orphanage.save(database, {
        lat: fields.lat,
        lng: fields.lng,
        name: fields.name,
        about: fields.about,
        whatsapp: fields.whatsapp,
        images: fields.images.toString(),
        instructions: fields.instructions,
        opening_hours: fields.opening_hours,
        open_on_weekends: fields.open_on_weekends,
      });

      return response.redirect("/orphanages");
    } catch (err) {
      console.log(err);

      return response.send("Erro no banco de dados");
    }
  },
};
