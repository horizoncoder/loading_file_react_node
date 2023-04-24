const express = require('express')
const app = express()
require('dotenv').config()
const fileUpload = require('express-fileupload')
const port = 3001
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const cors = require("cors");
app.use(cors())
app.use(fileUpload({}))
app.use("/api", require("./routes/index"))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})