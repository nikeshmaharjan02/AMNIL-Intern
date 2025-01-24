const express = require('express')
const path = require('path')

const gameRoutes = require('./routes/gameRoutes.js')


const app = express()
const PORT = 4000

app.use(express.json())

// Set EJS as the templating engine
app.set('view engine', 'ejs');


app.use(gameRoutes)

app.get('/', (req, res) => {
    res.render('index', { message: "Welcome to the Number Guessing Game !" });
  });

app.listen(PORT,()=>{
    console.log(`Server Started at PORT: ${PORT}`)
})