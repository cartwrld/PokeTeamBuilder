const express = require('express');
const router = express.Router();
const axios = require('axios');
const Pokemon = require('../public/javascripts/Pokemon.js');


const rand10arr = [];

async function generate10RandomHomePagePokemon() {
  let homepagePokes;
  try {
    // array of 10 poke objs
    homepagePokes =
      await axios
          .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0') // get total count of pokemon
          .then(async (response) => {
          // use response.data instead of response.ok since we're using axios
            if (!response.data) {
              throw new Error(`Initial HTTP error! Status: ${response.status}`);
            }

            // loop through 10 times to create an array of Pokemon objects to display on the homepage
            for (let i = 0; i < 10; i++) {
            // generate random number that won't exceed the count of pokemon to avoid error
              const randPoke = response.data.results[Math.floor(Math.random() * response.data.count)];
              const pokeURL = randPoke.url; // get the url of the randomly chosen pokemon

              // fetch with specific URL corresponding to the randomly chosen pokemon
              await axios.get(pokeURL)
                  .then(async (response) => {
                    if (!response.data) {
                      throw new Error(`Fetch ${i} HTTP error! Status: ${response.status}`);
                    }
                    const pokeData = response.data;

                    const randPoke = new Pokemon(
                        pokeData.name,
                        pokeData.id,
                        pokeData.base_experience,
                        pokeData.stats,
                        pokeData.sprites.back_default,
                    );
                    rand10arr.push(randPoke);
                  });
            }
            return rand10arr;
          });
  } catch (error) {
    console.error(error);
  }
  console.log(homepagePokes);
  return homepagePokes;
}


// console.log(rand10arr);
// return rand10arr;
// }).then((rand10) => {
//   for (const p of rand10) {
//     console.log(p);
//   }
// })
// .catch((error) => {
//   console.error(error);
// });
/* GET home page. */
router.get('/', async function(req, res, next) {
  // console.log()

  generate10RandomHomePagePokemon()
      .then((r10) => {
        console.log(r10);
      });


  res.render('index', {
    title: 'PokeDex',
    path: 'https://www.pngkit.com/png/full/783-7831178_pokeball-pokeball-pixel-png.png',
    // cards: rand10Pokes,

  });
  // const xxx = [];
  // for (const pokemon of rand10Pokes) {
  // for (const prop in pokemon) {
  //   xxx.push({
  //     prop: info,
  //   });
  // }
});

module.exports = router;


