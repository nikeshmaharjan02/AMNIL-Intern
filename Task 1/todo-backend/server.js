const express = require('express')
const cors = require('cors')
const todoRoutes = require('./routes/todoRoutes.js');

// app config
const app = express()
const PORT = 3000

//middlewares
app.use(cors());
app.use(express.json())

// api endpoints
app.use('/api/todos', todoRoutes);
app.get("/",(req,res)=>{
    res.send("API Working")
})


app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})