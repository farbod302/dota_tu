const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const http = require("http")
const middleware = require("./helper/middleware")
const routs = require("./routs")

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(middleware.body_handler)
app.use(middleware.token_handler)

const routs_keys = Object.keys(routs)
routs_keys.forEach(path => app.use(path, routs[path]))

mongoose.connect(process.env.DB)

const server = http.createServer(app)
server.listen(process.env.PORT, () => { console.log(`server run on port ${process.env.PORT}`) })


