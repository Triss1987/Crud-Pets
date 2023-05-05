const Pet = require("../models/pets.model.js");

  // Crear/Ingresar una mascota.
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Registro sin datos."
    });
  }

  const pet = new Pet({
    name: req.body.name,
    description: req.body.description,
    breed: req.body.breed,
    age: req.body.age,
  });

  // Creación/Ingreso de mascota.
  Pet.create(pet, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error con la creación de la mascota."
      });
    else res.send(data);
  });
};



exports.findAll = (req, res) => {
  const title = req.query.title;

  Pet.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error con la creación de la mascota."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Pet.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "Registro no encontrado") {
        res.status(404).send({
          message: `Mascota no encontrada: ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error de búsqueda " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Sin registro"
    });
  }

  console.log(req.body);

  Pet.updateById(
    req.params.id,
    new Pet(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "Registro no encontrado") {
          res.status(404).send({
            message: `Registro no encontrado: ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar el registro: " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Pet.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "Registro no encontrado") {
        res.status(404).send({
          message: `Registro no encontrado: ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar el registro de la mascota: " + req.params.id
        });
      }
    } else res.send({ message: `Registro eliminado` });
  });
};

exports.deleteAll = (req, res) => {
  Pet.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error, intente más tarde..."
      });
    else res.send({ message: `Eliminacion de todas las mascotas.` });
  });
};
