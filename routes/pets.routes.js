module.exports = app => {
  const pets = require("../controllers/pets.controller.js");

  var router = require("express").Router();

  //Creación/Ingreso de una nueva mascota.
  router.post("/", pets.create);

  //Listado de elementos existentes.
  router.get("/", pets.findAll);

  //Búsqueda de mascotas por ID.
  router.get("/:id", pets.findOne);

  //Actualizacíón de mascotas por ID.
  router.put("/:id", pets.update);

  //Eliminación de una mascota por ID.
  router.delete("/:id", pets.delete);

  //Eliminación del listado existente de mascotas.
  router.delete("/", pets.deleteAll);

  app.use('/api/pets', router);
};
