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
          .get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0') // get total count of pokemon
          .then(async (response) => {
          // use response.data instead of response.ok since we're using axios
            if (!response.data) {
              throw new Error(`Initial HTTP error! Status: ${response.status}`);
            }

            // loop through 10 times to create an array of Pokemon objects to display on the homepage
            for (let i = 0; i < 10; i++) {
            // generate random number is within the resultset
              const randPoke = response.data.results[Math.floor(Math.random() * response.data.results.length)];
              const pokeURL = randPoke.url; // get the url of the randomly chosen pokemon

              // fetch with specific URL corresponding to the randomly chosen pokemon
              await axios.get(pokeURL)
                  .then(async (response) => {
                    if (!response.data) {
                      throw new Error(`Fetch ${i} HTTP error! Status: ${response.status}`);
                    }
                    const pokeData = response.data;


                    const randPoke = buildPokeObj(pokeData);
                    rand10arr.push(randPoke);
                  });
            }
            return rand10arr;
          });
  } catch (error) {
    console.error(error);
  }
  return homepagePokes;
}

function buildPokeObj(pd) {
  // initial build of the Pokemon based off the passed in data
  const pokeObj = new Pokemon(
      pd.name,
      pd.id,
      pd.base_experience,
      pd.stats,
      pd.sprites.back_default,
  );

  // checking to see if the Pokemon is multi-typed
  if (pd.types.length === 1) {
    pokeObj.type1 = pd.types[0].type.name;
  } else {
    pokeObj.type1 = pd.types[0].type.name;
    pokeObj.type2 = pd.types[1].type.name;
  }
  return pokeObj;
}


/* GET home page. */
router.get('/', async function(req, res, next) {
  // console.log()

  generate10RandomHomePagePokemon()
      .then((r10) => {
        console.log(r10);
      });
  const rand10Pokes = [];

  for (let i=0; i<10; i++) {
    for (const prop in rand10Pokes[i]) {
      console.log(prop);
    }
  }

  res.render('index', {
    title: 'PokeDex',
    path: 'https://www.pngkit.com/png/full/783-7831178_pokeball-pokeball-pixel-png.png',

    cards: rand10Pokes,

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


