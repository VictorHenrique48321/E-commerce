type fruitCart = {
  id: number,
  name?: string,
  nutritions?: {
    calories?: string,
    carbohydrates?: string,
    fat?: string,
    protein?: string,
    sugar?: string
  },
  quantity: number
}

export default fruitCart