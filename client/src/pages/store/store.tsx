import { Button, ButtonProps, Card, CardActions, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import fruitsType from '../../types/fruits'

const Store = () => {

  const [fruits, setFruits] = useState<fruitsType>()

  const getData = async () => {
    const data = await fetch("http://localhost:5000/fruits")
    const response = await data.json()

    setFruits(response)
  }

  const addItemCart = (fruitId: number, fruitName: string) => {

    const addFruit = JSON.parse(localStorage.getItem("fruitCart") || `{}`)

    if(localStorage.getItem("fruitCart") === null){
      addFruit.fruits = [{
        id: fruitId,
        quantity: 1
      }]
      return localStorage.setItem("fruitCart", JSON.stringify(addFruit))
    }
    
    let found = false 
    addFruit.fruits.forEach((fruit: {id: number}) => {
      if(fruit.id === fruitId) {
        found = true
        return
      }
    })

    console.log(addFruit)

    if(!found) {
      addFruit.fruits.push({
        id: fruitId, 
        quantity: 1
      })
  
      return localStorage.setItem("fruitCart", JSON.stringify(addFruit))
    }
  }
  
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "80%",
    margin: "15px auto"
  }

  const fruitImageStyle = {
    height: {"xs": "250px", "lg": "200px"},
    width: {"xs": "100%"},
    margin: {"xs": "0"}
  }

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    '&:hover': {
      backgroundColor: "#c3e77e",
    },
  }))

  useEffect(() => {
    getData()
  }, [])

  return (
    <Grid container spacing={2} sx={containerStyle}>
      {fruits?.map((value) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={value.id}>
          <Card sx={{border: "2px solid #89bd23", width: "90%", margin: "0 auto"}}>
            <CardMedia 
              sx={fruitImageStyle}
              component="img"
              image={require(`../../fruits/${value.name.toLowerCase()}.jpg`)}
            />
            <CardContent>
              <Typography>{value.name}</Typography>
            </CardContent>
            <CardActions>
              <ColorButton onClick={() => addItemCart(value.id, value.name)} sx={{width: "100%", backgroundColor: "#89bd23", color: "black"}} variant="text">
                Add to cart
              </ColorButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Store

