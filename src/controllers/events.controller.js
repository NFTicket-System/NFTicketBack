const appDb = require('./../server')

exports.getAllEvents = async (req, res) => {
    const sql = 'SELECT * FROM event'

    appDb.db.query(sql, (err, result) => {
        if (err) {
            console.log(`Erreur requête : ${err}`)
            res.status(500).send({ error: 'Error : Internal Server Error' })
        } else {
            res.status(200).send(result)
        }
    })
}

exports.getAllLightEvents = async (req, res) => {
    const sql = 'SELECT id, urlImage, libelle FROM event'

    appDb.db.query(sql, (err, result) => {
        if (err) {
            console.log(`Erreur requête : ${err}`)
            res.status(500).send({ error: 'Error : Internal Server Error' })
        } else {
            res.status(200).send(result)
        }
    })
}

exports.getAllTrendemousLightEvents = async (req, res) => {
    const sql = `SELECT id, urlImage, libelle 
    FROM event 
    WHERE isTrendemous = true`

    appDb.db.query(sql, (err, result) => {
        if (err) {
            console.log(`Erreur requête : ${err}`)
            res.status(500).send({ error: 'Error : Internal Server Error' })
        } else {
            res.status(200).send(result)
        }
    })
}

exports.getSingleEventFromId = async (req, res) => {
    const sql = `SELECT * 
    FROM event
    WHERE id = '${req.params.id}'`

    appDb.db.query(sql, (err, result) => {
        if (err) {
            console.log(`Erreur requête : ${err}`)
            res.status(500).send({ error: 'Error : Internal Server Error' })
        } else {
            res.status(200).send(result)
        }
    })
}

exports.getAllLightEventsFromCat = async (req, res) => {
    const sql = `SELECT id, urlImage, libelle 
    FROM event
    WHERE id = (
        SELECT idEvent
        FROM groupe_category
        WHERE idCategory = (
            SELECT id
            FROM category
            WHERE libelle = '${req.params.libelle}'))`

    appDb.db.query(sql, (err, result) => {
        if (err) {
            console.log(`Erreur requête : ${err}`)
            res.status(500).send({ error: 'Error : Internal Server Error' })
        } else {
            res.status(200).send(result)
        }
    })
}

exports.getAllLightEventsFromCity = async (req, res) => {
    const sql = `SELECT id, urlImage, libelle 
    FROM event
    WHERE idCity = '${req.params.id}'`

    appDb.db.query(sql, (err, result) => {
        if (err) {
            console.log(`Erreur requête : ${err}`)
            res.status(500).send({ error: 'Error : Internal Server Error' })
        } else {
            res.status(200).send(result)
        }
    })
}