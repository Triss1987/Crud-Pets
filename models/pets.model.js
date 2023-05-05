const sql = require("./db.js");

const Pets = function(pet) {
  this.name = pet.name;
  this.description = pet.description;
  this.breed = pet.breed;
  this.age = pet.age;
};

// Creación/Ingreso de una nueva mascota.
Pets.create = (newPet, result) => {
  sql.query("INSERT INTO pets SET ?", newPet, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Mascota ingresa correctamente: ", { id: res.insertId, ...newPet });
    result(null, { id: res.insertId, ...newPet });
  });
};

//Búsqueda de una mascota por ID.
Pets.findById = (id, result) => {
  sql.query(`SELECT * FROM pets WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Mascota encontrada: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "Registro no encontrado" }, null);
  });
};

//Listado de todas las mascotas.
Pets.getAll = (title, result) => {
  let query = "SELECT * FROM pets";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Mascotas: ", res);
    result(null, res);
  });
};



//Actualización de la mascota con ID.
Pets.updateById = (id, pet, result) => {
  sql.query(
    "UPDATE pets SET name = ?, description = ? WHERE id = ?",
    [pet.name, pet.description, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "Registro no encontrado" }, null);
        return;
      }

      console.log("Mascota actualizada: ", { id: id, ...pet });
      result(null, { id: id, ...pet });
    }
  );
};

//Eliminación del ID de la mascota.
Pets.remove = (id, result) => {
  sql.query("DELETE FROM pets WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "Registro no encontrado" }, null);
      return;
    }

    console.log("Registro eliminado: ", id);
    result(null, res);
  });
};


//Eliminación de todos los registros existentes en la base de datos.
Pets.removeAll = result => {
  sql.query("DELETE FROM pets", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Mascota ${res.affectedRows} eliminada`);
    result(null, res);
  });
};

module.exports = Pets;
