const Router = require("express")
const cors = require("cors")

const FruitControllers = require("../controllers/fruitControllers")

const router = Router()

router
  .get("/fruits", cors(), FruitControllers.getAllFruits)
  .get("/fruit/:id", cors(), FruitControllers.getFruitById)

module.exports = router