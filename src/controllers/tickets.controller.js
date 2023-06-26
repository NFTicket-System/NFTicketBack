const appDb = require("./../server");

exports.getAllTickets = async (req, res) => {
  const sql = "SELECT * FROM ticket";

  appDb.db.query(sql, (err, result) => {
    if (err) {
      console.log(`Erreur requête : ${err}`);
      res.status(500).send({ error: "Error : Internal Server Error" });
    } else {
      res.status(200).send(result);
    }
  });
};

exports.getAllLightTickets = async (req, res) => {
  const sql = "SELECT id, idEvent, addressContract, prix FROM ticket";

  appDb.db.query(sql, (err, result) => {
    if (err) {
      console.log(`Erreur requête : ${err}`);
      res.status(500).send({ error: "Error : Internal Server Error" });
    } else {
      res.status(200).send(result);
    }
  });
};
