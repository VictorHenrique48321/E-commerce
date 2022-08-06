import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, styled, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import fruitCart from "../../types/fruitCart"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";

const Cart = () => {

  const [fruitsData, setFruitsData] = useState<fruitCart[]>([])

  const showData = async (fruitsId: []) => {
    
    let fruitsInfo: fruitCart[] = []

    await Promise.all(fruitsId.map( async (object: {id: number, quantity: number}) => {
      const data = await fetch(`http://localhost:5000/fruit/${object.id}`)
      const response = await data.json()

      const fruit: fruitCart = {
        id: response.id,
        name: response.name,
        nutritions: {
          calories: response.nutritions.calories,
          carbohydrates: response.nutritions.carbohydrates,
          fat: response.nutritions.fat,
          protein: response.nutritions.protein,
          sugar: response.nutritions.sugar
        },
        quantity: object.quantity
      }

      return fruitsInfo.push(fruit)
    }))

    setFruitsData(fruitsInfo)

  }

  const changeFruitQuantity = (fruitId: number, iconValue: string) => {
    
    fruitsData.forEach((fruit) => {
      if(fruit.id === fruitId) {

        let newQuantity = iconValue === "add" ? fruit.quantity + 1 : fruit.quantity - 1
        newQuantity = newQuantity <= 0 ? 1 : newQuantity

        const increaseQuantity = {
          id: fruit.id,
          name: fruit.name,
          nutritions: fruit.nutritions,
          quantity: newQuantity
        }

        const updatedFruit = fruitsData
        const index = updatedFruit.findIndex(o => o.id === increaseQuantity.id)

        if(updatedFruit[index]){
          updatedFruit[index] = increaseQuantity
        }

        setFruitsData([...updatedFruit])
        updateLocalStorage("changeQuantity")
      }
    })
  }

  const removeFruitCart = (fruitId: number) => {

    fruitsData.forEach((fruit) => {
      if(fruit.id === fruitId) {
        const index = fruitsData.indexOf(fruit)
        if(index > -1) {
          const cart = fruitsData
          cart.splice(index, 1)
          setFruitsData([...cart])
          updateLocalStorage("delete")
        }
      }
    })
  }

  const updateLocalStorage = (method: string) => {
    
    let fruitLocalStorage = JSON.parse(localStorage.getItem("fruitCart") || `[]`)
    fruitLocalStorage = fruitLocalStorage.fruits

    let updatedLocalStorage = {fruits: [{}]}

    if(method === "changeQuantity") {
      for (let i = 0; i < fruitsData.length; i++) {
        fruitLocalStorage[i].quantity = fruitsData[i].quantity
      }

      updatedLocalStorage.fruits = fruitLocalStorage

      console.log("ola")
      return localStorage.setItem("fruitCart", JSON.stringify(updatedLocalStorage))
    }

    console.log(fruitsData)
    for (let i = 0; i < fruitsData.length; i++) {
      
      updatedLocalStorage.fruits.push({
        id: fruitsData[i].id,
        quantity: fruitsData[i].quantity
      })

      console.log(fruitsData[i])
    }

    updatedLocalStorage.fruits.shift()    
    return localStorage.setItem("fruitCart", JSON.stringify(updatedLocalStorage))
  }

  const CardWithoutPadding = styled(CardContent)(
    `&:last-child {
      padding-bottom: 16px
    }`
  )

  useEffect(() => {
    
    const getFruitsLocalStorage = JSON.parse(localStorage.getItem("fruitCart") || `[]`)
    const fruitsFormated = getFruitsLocalStorage.fruits
        
    if(fruitsFormated.length > 0 && fruitsData.length <= 0) {
      showData(fruitsFormated)
    }

    return
  }, [])

  if(fruitsData.length > 0 ) {
    return (
      <Box sx={{width: {"xs": "100%", "md": "90%"}, margin: "15px auto"}}>
        <Typography textAlign="center" variant="h4">Cart</Typography>
        <Grid container sx={{width: {"xs": "100%"}, margin: "20px auto"}}>
          <Grid item xs={7} sx={{marginBottom: "10px"}}>Product</Grid>
          <Grid item xs={3} sx={{marginBottom: "10px"}}>Quantity</Grid>
          <Grid item xs={2} sx={{marginBottom: "10px"}}>Remove</Grid>
          {fruitsData?.map((value) => (
          <Grid container key={value.id} sx={{backgroundColor: "white", marginBottom: "10px", boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)", border: "2px solid #89bd23", borderRadius: "4px"}}>
            <Grid item xs={7} sx={{borderRight: "2px solid #89bd23"}}>
              <Card sx={{display: "flex", height: {"xs": "auto"}, boxShadow: "none"}}>
                <CardMedia
                  sx={{height: "auto", width: {"xs": "20%"}, margin: {"xs": "0 auto"}}}
                  component="img"
                  image={require(`../../fruits/${value.name?.toLowerCase()}.jpg`)}
                />
                <CardWithoutPadding sx={{display: "flex", alignItems: "center", flexDirection: "column", width: "100%", justifyContent: "center"}}>
                  <Typography sx={{fontSize: {"xs": "11px", "sm": "16px"}}}>{value.name}</Typography>
                  <Typography sx={{fontSize: {"xs": "11px", "sm": "16px"}}}>Calories: {value.nutritions?.calories}g</Typography>
                  <Typography sx={{fontSize: {"xs": "11px", "sm": "16px"}}}>Protein: {value.nutritions?.protein}g</Typography>
                  <Typography sx={{fontSize: {"xs": "11px", "sm": "16px"}}}>Carbohydrates: {value.nutritions?.carbohydrates}g</Typography>
                  <Typography sx={{fontSize: {"xs": "11px", "sm": "16px"}}}>Sugar: {value.nutritions?.sugar}g</Typography>
                  <Typography sx={{fontSize: {"xs": "11px", "sm": "16px"}}}>Fat: {value.nutritions?.fat}g</Typography>
                </CardWithoutPadding>
              </Card>
            </Grid>
            <Grid item xs={3} sx={{borderRight: "2px solid #89bd23"}}>
              <Card sx={{height: "100%", width: "100%", display: "flex", alignItems: "center", boxShadow: "none", justifyContent: "space-evenly"}}>
                <IconButton aria-label="add" onClick={() => changeFruitQuantity(value.id, "add")}>
                  <AddIcon/>
                </IconButton>
                <Typography>{value.quantity}</Typography>
                <IconButton aria-label="remove" onClick={() => changeFruitQuantity(value.id, "remove")}>
                  <RemoveIcon/>
                </IconButton>
              </Card>
            </Grid>
            <Grid item xs={2}>
              <Card sx={{height: "100%", width: "100%", display: "flex", alignItems: "center", boxShadow: "none", justifyContent: "center"}}>
                <DeleteIcon sx={{color: "#89bd23"}} onClick={() => removeFruitCart(value.id)} fontSize="large"/>
              </Card>
            </Grid>
          </Grid>
          ))}
        </Grid>
      </Box>
    )
  } else {
    return (
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Typography variant="h6" margin="10px">
          It seems that your cart is empty
        </Typography>
        <Button variant="contained">
          <Link to="/" style={{"color": "black", "textDecoration": "none"}}>
            Go back to the store            
          </Link>
        </Button>
      </Box>
    )
  }
}

export default Cart