const express = require("express")
const routes = require("./routes/bodyParser")

const app = express()
const port = process.env.PORT || 5000

routes(app)

app.listen(port, () => console.log("Server is running"))

module.exports = app