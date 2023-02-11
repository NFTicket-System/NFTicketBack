//const Sequelize = require('sequelize')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv')
const eventRouter = require('./routes/events.route')
const mysql = require('mysql')

dotenv.config()

const app = express()

const port = process.env.PORT

var connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

// adding Helmet to enhance your Rest API's security
app.use(helmet())
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json())
// enabling CORS for all requests
app.use(cors())
// adding morgan to log HTTP requests
app.use(morgan('combined'))

app.use("/api/events", eventRouter)

connection.connect(function(err) {
    if (err) throw err
    else{
        console.log('Connection with database has been established successfully.')
    }
})

app.listen(port, ()=>{
    console.log("server listening on port " + port + "...")
})

exports.db = connection