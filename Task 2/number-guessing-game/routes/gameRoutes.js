const express = require('express');
const router = express.Router();
const {startGame, makeGuess} = require('../controllers/gameControllers.js');


router.get('/start-game', startGame);


router.get('/guess/:number', makeGuess);

module.exports = router;
