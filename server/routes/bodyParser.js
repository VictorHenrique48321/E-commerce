const bodyParser = require("body-parser")

const routes = require("./index")

module.exports = app => {
  app.use(
    bodyParser.json(),
    routes
  )
}