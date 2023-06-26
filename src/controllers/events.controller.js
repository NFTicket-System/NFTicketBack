const appDb = require("./../server");

exports.getAllEvents = async (req, res) => {
  const sql = "SELECT * FROM event";

  appDb.db.query(sql, (err, result) => {
    if (err) {
      console.log(`Erreur requête : ${err}`);
      res.status(500).send({ error: "Error : Internal Server Error" });
    } else {
      res.status(200).send(result);
    }
  });
};

exports.getAllLightEvents = async (req, res) => {
  const sql = "SELECT id, urlImage, libelle FROM event";

  appDb.db.query(sql, (err, result) => {
    if (err) {
      console.log(`Erreur requête : ${err}`);
      res.status(500).send({ error: "Error : Internal Server Error" });
    } else {
      res.status(200).send(result);
    }
  });
};

exports.getAllTrendemousLightEvents = async (req, res) => {
  const sql = `SELECT id, urlImage, libelle 
    FROM event 
    WHERE isTrendemous = true`;

  appDb.db.query(sql, (err, result) => {
    if (err) {
      console.log(`Erreur requête : ${err}`);
      res.status(500).send({ error: "Error : Internal Server Error" });
    } else {
      res.status(200).send(result);
    }
  });
};

exports.getSingleEventFromId = async (req, res) => {
  const sql = `SELECT e.*, t.id AS ticket_id, t.addressContract, t.prix, t.type, t.date, t.solded
    FROM event e JOIN ticket t ON e.id = t.idEvent
    WHERE e.id = '${req.params.id}'
    AND t.solded = false`;

  appDb.db.query(sql, (err, result) => {
    if (err) {
      console.log(`Erreur requête : ${err}`);
      res.status(500).send({ error: "Error : Internal Server Error" });
    } else {
      if (result.length === 0) {
        res.status(404).send({ error: "Element introuvable" });
      } else {
        const eventResponse = {
          id: result[0].id,
          libelle: result[0].libelle,
          timestampStart: result[0].timestampStart,
          timestampEnd: result[0].timestampEnd,
          idOrganizer: result[0].idOrganizer,
          timestampCreation: result[0].timestampCreation,
          isTrendemous: result[0].isTrendemous,
          urlImage: result[0].urlImage,
          city: result[0].city,
          address: result[0].address,
          tickets: [],
        };

        result.forEach((row) => {
          const ticket = {
            id: row.ticket_id,
            addressContract: row.addressContract,
            prix: row.prix,
            type: row.type,
            date: row.date,
            solded: row.solded,
          };

          eventResponse.tickets.push(ticket);
        });
        res.status(200).send(eventResponse);
      }
    }
  });
};

exports.getAllLightEventsFromCat = async (req, res) => {
  const sql = `SELECT id, urlImage, libelle 
    FROM event
    WHERE id = (
        SELECT idEvent
        FROM groupe_category
        WHERE idCategory = (
            SELECT id
            FROM category
            WHERE libelle = '${req.params.libelle}'))`;

  appDb.db.query(sql, (err, result) => {
    if (err) {
      console.log(`Erreur requête : ${err}`);
      res.status(500).send({ error: "Error : Internal Server Error" });
    } else {
      res.status(200).send(result);
    }
  });
};

exports.getAllLightEventsFromCity = async (req, res) => {
  const sql = `SELECT id, urlImage, libelle 
    FROM event
    WHERE idCity = '${req.params.id}'`;

  appDb.db.query(sql, (err, result) => {
    if (err) {
      console.log(`Erreur requête : ${err}`);
      res.status(500).send({ error: "Error : Internal Server Error" });
    } else {
      res.status(200).send(result);
    }
  });
};

exports.getAllCategoriesEvent = async (req, res) => {
  const sql = `SELECT *
    FROM category
    WHERE id IN (
        SELECT idCategory
        FROM groupe_category
        WHERE idEvent = '${req.params.id}'
    )`;

  appDb.db.query(sql, (err, result) => {
    if (err) {
      console.log(`Erreur requête : ${err}`);
      res.status(500).send({ error: "Error : Internal Server Error" });
    } else {
      if (result.length === 0) {
        res.status(404).send({ error: "Element introuvable" });
      } else {
        res.status(200).send(result);
      }
    }
  });
};

exports.getAllCategories = async (req, res) => {
  const sql = `SELECT *
    FROM category`;

  appDb.db.query(sql, (err, result) => {
    if (err) {
      console.log(`Erreur requête : ${err}`);
      res.status(500).send({ error: "Error : Internal Server Error" });
    } else {
      if (result.length === 0) {
        res.status(404).send({ error: "Element introuvable" });
      } else {
        res.status(200).send(result);
      }
    }
  });
};
