module.exports = app => {
  const pets = require("../controllers/pets.controller.js");

  var router = require("express").Router();

  //Creaci�n/Ingreso de una nueva mascota.
  router.post("/", pets.create);

  //Listado de elementos existentes.
  router.get("/", pets.findAll);

  //B�squeda de mascotas por ID.
  router.get("/:id", pets.findOne);

  //Actualizac��n de mascotas por ID.
  router.put("/:id", pets.update);

  //Eliminaci�n de una mascota por ID.
  router.delete("/:id", pets.delete);

  //Eliminaci�n del listado existente de mascotas.
  router.delete("/", pets.deleteAll);

  app.use('/api/pets', router);
};
