const appDb = require("./../server");

exports.getAllEvents = async (req, res) => {
    const sql = "SELECT * FROM event";

    appDb.db.query(sql, (err, result) => {
        if (err) {
            console.log(`Erreur requête : ${err}`);
            res.status(500).send({error: "Error : Internal Server Error"});
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
            res.status(500).send({error: "Error : Internal Server Error"});
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
            res.status(500).send({error: "Error : Internal Server Error"});
        } else {
            res.status(200).send(result);
        }
    });
};

exports.getSingleEventFromId = async (req, res) => {
    const sql = `SELECT e.*, t.id AS ticket_id, t.addressContract, t.prix, t.type, t.date, t.solded
                 FROM event e
                          JOIN ticket t ON e.id = t.idEvent
                 WHERE e.id = '${req.params.id}'
                   AND t.solded = false`;

    appDb.db.query(sql, (err, result) => {
        if (err) {
            console.log(`Erreur requête : ${err}`);
            res.status(500).send({error: "Error : Internal Server Error"});
        } else {
            if (result.length === 0) {
                res.status(404).send({error: "Element introuvable"});
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
                        solded: row.solded
                    };

                    eventResponse.tickets.push(ticket);
                });
                res.status(200).send(eventResponse);
            }
        }
    });
};

exports.getSingleEventLocationFromLibelle = async (req, res) => {
    const sql = `SELECT city, address
                 FROM event
                 WHERE libelle = '${req.params.libelle}'`

    appDb.db.query(sql, (err, result) => {
        if (err) {
            console.log(`Erreur requête : ${err}`);
            res.status(500).send({error: "Error : Internal Server Error"});
        } else {
            res.status(200).send(result);
        }
    });
}

exports.getAllLightEventsFromCat = async (req, res) => {
    const sql = `SELECT id, urlImage, libelle
                 FROM event
                 WHERE id IN (SELECT idEvent
                              FROM groupe_category
                              WHERE idCategory = (SELECT id
                                                  FROM category
                                                  WHERE libelle = '${req.params.libelle}'))`;

    appDb.db.query(sql, (err, result) => {
        if (err) {
            console.log(`Erreur requête : ${err}`);
            res.status(500).send({error: "Error : Internal Server Error"});
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
            res.status(500).send({error: "Error : Internal Server Error"});
        } else {
            res.status(200).send(result);
        }
    });
};

exports.getAllCategoriesEvent = async (req, res) => {
    const sql = `SELECT *
                 FROM category
                 WHERE id IN (SELECT idCategory
                              FROM groupe_category
                              WHERE idEvent = '${req.params.id}')`;

    appDb.db.query(sql, (err, result) => {
        if (err) {
            console.log(`Erreur requête : ${err}`);
            res.status(500).send({error: "Error : Internal Server Error"});
        } else {
            if (result.length === 0) {
                res.status(404).send({error: "Element introuvable"});
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
            res.status(500).send({error: "Error : Internal Server Error"});
        } else {
            if (result.length === 0) {
                res.status(404).send({error: "Element introuvable"});
            } else {
                res.status(200).send(result);
            }
        }
    });
};

exports.getEventIsUsed = async (req, res) => {
    const sql = `SELECT used
                 FROM ticket
                 WHERE nftId = '${req.body.nftId}'
                   AND addressContract = '${req.body.addressContract}'`;

    appDb.db.query(sql, (err, result) => {
        if (err) {
            console.log(`Erreur requête : ${err}`);
            res.status(500).send({error: "Error : Internal Server Error"});
        } else {
            if (result[0].used) {
                res.status(200).json(true);
            } else {
                const updateSql = `UPDATE ticket
                                   SET used = 1
                                   WHERE nftId = '${req.body.nftId}'
                                     AND addressContract = '${req.body.addressContract}'`;

                appDb.db.query(updateSql, (err, result) => {
                    if (err) {
                        console.log(`Erreur requête : ${err}`);
                        res.status(500).send({error: "Error : Internal Server Error"});
                    } else {
                        res.status(200).json(false);
                    }
                });
            }
        }
    });
}

exports.addEvent = async (req, res) => {
    const libelle = req.body.libelle;
    const timestampStart = req.body.timestampStart;
    const timestampEnd = req.body.timestampEnd;
    const idOrganizer = req.body.idOrganizer;
    const isTrendemous = req.body.isTrendemous;
    const urlImage = req.body.urlImage;
    const city = req.body.city;
    const address = req.body.address;

    const sql = `INSERT INTO event(libelle, timestampStart, timestampEnd, idOrganizer, isTrendemous, urlImage, city,
                                   address)
                 VALUES ('${libelle}', '${timestampStart}', '${timestampEnd}', '${idOrganizer}', '${isTrendemous}',
                         '${urlImage}', '${city}', '${address}')`;

    appDb.db.query(sql, (err, result) => {
        if (err) {
            console.log(`Erreur requête : ${err}`);
            res.status(500).send({error: "Error : Internal Server Error"});
        } else {
            res.status(200).send(result);
        }
    });
};

exports.addTicket = async (req, res) => {
    const tickets = req.body;

    tickets.forEach((ticket) => {
        const sql = `INSERT INTO ticket (addressContract, idEvent, prix, type, date, solded)
                     VALUES ('${ticket.addressContract}', '${ticket.idEvent}', '${ticket.prix}', '${ticket.type}',
                             '${ticket.date}', '${ticket.solded}')`;

        appDb.db.query(sql, (err, result) => {
            if (err) {
                console.log(`Erreur requête : ${err}`);
                res.status(500).send({error: "Error : Internal Server Error"});
            }
        });
    });
    res.status(200).send({message: "tickets créés"})
};

exports.addCategoriesToEvent = async (req, res) => {
    const eventId = req.body.id;
    const categories = req.body.categories;

    categories.forEach((category) => {
        const sql = `INSERT INTO groupe_category (idEvent, idCategory)
                     VALUES ('${eventId}', '${category}')`;

        appDb.db.query(sql, (err, result) => {
            if (err) {
                console.log("fsfziugflizqugfiqzuvfzvFEHZVCYzevc");
                console.log(`Erreur requête : ${err}`);
                res.status(500).send({error: "Error : Internal Server Error"});
            }
        });
    });
    res.status(200).send({message: "categories créées"})
};
