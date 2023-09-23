const express = require('express');
const router = express.Router();
const Pokemon = require('../public/javascripts/Pokemon.js');
const PowerPoke = require('../public/javascripts/PowerPoke.js');

const pp = new PowerPoke();

let random10HPP;

// const rand10arr = [];

async function generate10RandomHomePagePokemon() {
  const initList = await pp.getInitialPokeCountWithURL();
  let x;
  const randomHomePokes = async () => {
    x = await pp.get10RandomPokeURLFromInitialFetch(initList);
    return x;
  };
  return randomHomePokes();
}


/* GET home page. */
router.get('/', async function(req, res, next) {
  const displayPokes = [];
  const rand10Pokes = await generate10RandomHomePagePokemon();
  console.log(rand10Pokes);
  console.log(rand10Pokes.length);
  const outputInfo = async () => {
    for (const [, poke] of Object.entries(rand10Pokes)) {
      displayPokes.push({
        pokename: poke.name,
        pokeid: poke.id,
        pokesprite: poke.sprite,
        pokegen: poke.gen,
        poketypes: await getPokeTypeObj(poke),
        pokestats: await getPokeStatsObj(poke),
        multitype: poke.type2 !== undefined,
      });
    }

    async function getPokeStatsObj(pokemon) {
      return {
        pokeHP: pokemon.hp,
        pokeATK: pokemon.attack,
        pokeDEF: pokemon.defense,
        pokeSPATK: pokemon.specAtk,
        pokeSPDEF: pokemon.specDef,
        pokeSPD: pokemon.speed,
      };
    }

    async function getPokeTypeObj(pokemon) {
      return {
        poketype1: pokemon.type1,
        poketype2: pokemon.type2?.name,
      };
    }
  };
  await outputInfo();
  res.render('index', {
    title: 'PokeDex',
    path: 'https://www.pngkit.com/png/full/783-7831178_pokeball-pokeball-pixel-png.png',
    cards: displayPokes,

  });
});

module.exports = router;


