const express = require('express');
const router = express.Router();

// routername = pokedex, line 9 in app.js
// http://localhost:3000/pokedex/
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('teambuilder', {
    title: 'PokeDex',
    navImg: 'https://www.pngpacks.com/uploads/data/437/IMG_JbqsKHx6g8D0.png',
    cards: ['number 1', 'number2', 'number3', 'number4', 'number5'],

  });
});

// router.get('/browse', function(req, res, next) {
//   res.render('');
// });

module.exports = router;


