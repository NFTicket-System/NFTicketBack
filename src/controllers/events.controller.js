const appDb = require('./../server')

exports.getAllEvents = async (req, res) => {
    const sql = 'SELECT * FROM event'

    appDb.db.query(sql, (err, result) => {
        if (err){
            console.log(`Erreur requête : ${err}`)
            res.status(500).send({error: 'Error : Internal Server Error'})
        }else{
            res.status(200).send(result)
        }
    })
}

exports.getSingleEventFromId = async (req, res) => {
    const sql = `SELECT * 
    FROM event
    WHERE id = '${req.params.id}'`

    appDb.db.query(sql, (err, result) => {
        if (err){
            console.log(`Erreur requête : ${err}`)
            res.status(500).send({error: 'Error : Internal Server Error'})
        }else{
            res.status(200).send(result)
        }
    })
}

exports.getAllEventsFromCat = async (req, res) => {
    const sql = `SELECT * 
    FROM event
    WHERE idCategory = '${req.params.id}'`

    appDb.db.query(sql, (err, result) => {
        if (err){
            console.log(`Erreur requête : ${err}`)
            res.status(500).send({error: 'Error : Internal Server Error'})
        }else{
            res.status(200).send(result)
        }
    })
}

exports.getAllEventsFromCity = async (req, res) => {
    const sql = `SELECT * 
    FROM event
    WHERE idCity = '${req.params.id}'`

    appDb.db.query(sql, (err, result) => {
        if (err){
            console.log(`Erreur requête : ${err}`)
            res.status(500).send({error: 'Error : Internal Server Error'})
        }else{
            res.status(200).send(result)
        }
    })
}