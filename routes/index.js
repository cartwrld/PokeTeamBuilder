const express = require('express');
const router = express.Router();
const axios = require('axios');
// const Pokemon = require('../public/javascripts/Pokemon.js');

axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    .then((response) => {
      if (!response.data) {
        throw new Error(`First HTTP error! Status: ${response.status}`);
      }

      const rand10arr = [];
      for (let i = 0; i < 10; i++) {
        const randPoke = response.data.results[Math.floor(Math.random() * response.data.count)];
        const pokeURL = randPoke.url;
        console.log(pokeURL);

        axios.get(pokeURL)
            .then((response) => {
              if (!response.data) {
                throw new Error(`Fetch ${i} HTTP error! Status: ${response.status}`);
              }
              return response.json();
            }).then((pokeData) => {
              const randPoke = new Pokemon(
                  pokeData.name,
                  pokeData.id,
                  pokeData.base_experience,
                  pokeData.stats,
                  pokeData.sprites.back_default);
              rand10arr.push(randPoke);
            });
      }
      return rand10arr;
    }).then((rand10) => {

    })
    .catch((error) => {
      console.error(error);
    });
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'PokeDex',
    path: 'https://www.pngkit.com/png/full/783-7831178_pokeball-pokeball-pixel-png.png',
    // cards: rand10Pokes,
    // pokename:
    // pokeid:
    // pokeexp:
    // pokeimg:
  });
});

module.exports = router;


