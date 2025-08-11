const express = require('express')
const app = express()
const cors = require ('cors')
const { dbConection } = require('./db')
const routers = require('./src/routers/router')
const port = 3000
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use(routers)

dbConection()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
