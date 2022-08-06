const axios = require("axios")

class FruitControllers {

  static async getAllFruits(req, res) {

    try {
      const url = "https://www.fruityvice.com/api/fruit/all"
      const response = await axios(url)
      let fruits = []

      response.data.forEach(value => {
        fruits.push({
          id: value.id,
          name: value.name,
        })
      })

      return res.status(200).json(fruits)

    } catch (error) {

      return res.status(500).json(error.message)

    }
  }

  static async getFruitById(req, res) {


    try {

      const fruitId = req.params.id

      const url = `https://www.fruityvice.com/api/fruit/${fruitId}`
      const response = await axios(url)
      let fruit = {}

      fruit["id"] = response.data.id
      fruit["name"] = response.data.name
      fruit["nutritions"] = {
        carbohydrates: response.data.nutritions.carbohydrates,
        protein: response.data.nutritions.protein,
        fat: response.data.nutritions.fat,
        calories: response.data.nutritions.calories,
        sugar: response.data.nutritions.sugar
      }

      return res.status(200).json(fruit)

    } catch (error) {

      return res.status(500).json(error.message)

    }

  }

}

module.exports = FruitControllers