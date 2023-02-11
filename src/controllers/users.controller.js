//const { User } = require('./../models/users.model')
const appDb = require('./../server')
const bcrypt = require('bcrypt')

exports.getAllUsers = async (req, res) => {
    const sql = 'SELECT * FROM user'

    appDb.db.query(sql, (err, result) => {
        if (err){
            console.log(`Erreur requête : ${err}`)
            res.status(500).send({error: 'Error : Internal Server Error'})
        }else{
            res.status(200).send(result)
        }
    })
}

exports.logUser = async (req, res) => {
    let username = req.body.username
    let password = req.body.password

    const sql = `SELECT password FROM user WHERE username='${username}'`

    appDb.db.query(sql, async (err, result) => {
        if (err){
            console.log(`Erreur requête : ${err}`)
            res.status(500).send({error: 'Error : Internal Server Error'})
        }
        if(result.length > 0){
            if(await bcrypt.compare(password, result[0].password)){
                res.status(200).send({message: 'Valid credentials'})
            }else{
                res.status(401).send({message: 'Wrong password'})
            }
        }else{
            res.status(401).send({message: 'Wrong username'})
        }
    })
}

exports.signUpUser = async (req, res) => {
    let email = req.body.email
    let username = req.body.username
    let password = req.body.password

    if (!(email && username && password)) {
      return res.status(400).send({ error: "Data not formatted properly" })
    }

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10)
    // now we set user password to hashed password
    const hashedPassword = await bcrypt.hash(password, salt)

    const sql = `INSERT INTO user(email, username, password) VALUES ('${email}', '${username}', '${hashedPassword}')`

    appDb.db.query(sql, (err, result) => {
        if (err){
            console.log(`Erreur requête : ${err}`)
            res.status(500).send({error: 'Error : Internal Server Error'})
        }else{
            res.status(201).send({message: 'User created'})
        }
    })
  }