const express = require('express');
const router = express.Router();
const axios = require('axios');
const Pokemon = require('../public/javascripts/Pokemon.js');
const PowerPoke = require('../public/javascripts/PowerPoke.js');
const pwrpke = new PowerPoke();
// const {defaults} = require('axios');


const rand10arr = [];

async function generate10RandomHomePagePokemon() {
  let homepagePokes = [];
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

                    const randPoke = pwrpke.buildPokeObj(response.data);
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

// function buildPokeObj(pokeData) {
//   // initial build of the Pokemon based off the passed in data
//   // console.log(pokeData.types);
//   //
//   // for (const type of pokeData.types) {
//   //   if (type.name !== undefined) {
//   //     // typeArr.push(type);
//   //     console.log(type.name);
//   //   } else {
//   //     console.log('No base_stat available for this object.');
//   //   }
//   // }
//
//   const p = new Pokemon(
//       pokeData.name,
//       pokeData.id,
//       pokeData.sprites.front_default,
//       pokeData.stats,
//       pokeData.types[0].type.name,
//   );
//
//   if (pokeData.types.length > 1) {
//     p.type2 = pokeData.types[1].type.name;
//   }
//
//   console.log(p);
//   return p;
// }


/* GET home page. */
router.get('/', async function(req, res, next) {
  // console.log()

  const rand10Pokes = [];

  generate10RandomHomePagePokemon()
      .then((r10) => {
        function getPokeStatsObj(pokemon) {
          return {
            pokeHP: pokemon.stats.hp,
            pokeATK: pokemon.stats.attack,
            pokeDEF: pokemon.stats.defense,
            pokeSPATK: pokemon.stats.specAtk,
            pokeSPDEF: pokemon.stats.specDef,
            pokeSPD: pokemon.stats.speed,
          };
        }
        function getPokeTypeObj(pokemon) {
          console.log();
          return {
            poketype1: pokemon.type1,
            poketype2: pokemon.type2?.name,

          };
        }

        for (const [, poke] of Object.entries(r10)) {
          rand10Pokes.push({
            pokename: poke.name,
            pokeid: poke.id,
            pokesprite: poke.sprite,
            pokegen: poke.gen,
            poketypes: getPokeTypeObj(poke),
            pokestats: getPokeStatsObj(poke),
            multitype: poke.type2 !== undefined,
          });
        }
        // console.log(rand10Pokes);

        res.render('index', {
          title: 'PokeDex',
          path: 'https://www.pngkit.com/png/full/783-7831178_pokeball-pokeball-pixel-png.png',
          cards: rand10Pokes,

          // cards: rand10Pokes,

        });
      });


  // const xxx = [];
  // for (const pokemon of rand10Pokes) {
  // for (const prop in pokemon) {
  //   xxx.push({
  //     prop: info,
  //   });
  // }
});
// switch (prop) {
//   case 'stats':
//     console.log(`${prop}\t:`);
//     const pokestats = poke[prop];
//     for (const stat in pokestats) {
//       console.log(`\t${stat}\t: ${pokestats[stat]}`);
//     }
//     break;
//   default: console.log(`${prop}\t: ${poke[prop]}`); break;
module.exports = router;


