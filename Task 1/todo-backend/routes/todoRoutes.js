const express = require('express');
const {getTodos, addTodo, deleteTodo, toggleCompletion} = require('../controllers/todoController.js')

const router = express.Router();


router.get('/', getTodos);
router.post('/', addTodo);
router.delete('/:id', deleteTodo);
router.put('/:id/toggle', toggleCompletion);




module.exports = router;
