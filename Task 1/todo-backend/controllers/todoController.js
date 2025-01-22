const Todo = require('../models/todo.js');
const path = require('path')
const fs = require('fs')

const filePath = path.join(__dirname, '../data/todos.json');

const getTodos = (req, res) => {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json({success:true,data});
};

const addTodo = (req,res)=> {
    const {task} = req.body

    if(!task) {
        return res.status(400).json({message: "Task required"})
    }
    const data = JSON.parse(fs.readFileSync(filePath,'utf-8'))

    //Use current timestamp as id
    const newId = Date.now().toString()
    const newTodo = new Todo(newId, task)

    data.push(newTodo)
    fs.writeFileSync(filePath,JSON.stringify(data))

    res.status(201).json(newTodo)
}

const deleteTodo = (req,res)=> {
    const { id } = req.params
    const data = JSON.parse(fs.readFileSync(filePath,'utf-8'))

    const newData = data.filter((todo)=>todo.id !== id)

    fs.writeFileSync(filePath,JSON.stringify(newData))

    res.json({ message: 'Todo deleted' });
}

const toggleCompletion = (req,res) => {
     const { id } = req.params
     const data = JSON.parse(fs.readFileSync(filePath,'utf-8'))

    const todoIndex = data.findIndex((todo)=>todo.id === id)

    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' })
    }

    data[todoIndex].isCompleted = !data[todoIndex].isCompleted

    fs.writeFileSync(filePath, JSON.stringify(data));

    res.json({message : "Todo Completed", todo : data[todoIndex]})

}



module.exports = { getTodos, addTodo, deleteTodo, toggleCompletion };