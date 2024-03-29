const express = require('express');
const router = express.Router();
const PowerPoke = require('../public/javascripts/PowerPoke');

const pp = new PowerPoke();

async function generate20PokemonEntries() {
  const initList = await pp.getInitialPokeCountWithURL();
  let x;
  const next20Pokes = async () => {
    x = await pp.getNext20Pokes(initList);
    return x;
  };
  return next20Pokes();
}

// routername = pokedex, line 9 in app.js
// http://localhost:3000/pokedex/
/* GET home page. */
router.get('/', async function(req, res, next) {
  const poke20List = await generate20PokemonEntries();
  const display20Pokes = [];
  const output20PokeInfo = async () => {
    for (const [, poke] of Object.entries(poke20List)) {
      display20Pokes.push({
        pokename: pp.formatPokeName(poke.name),
        pokeid: poke.id,
        pokesprite: poke.sprite,
        poketype1: pp.capitalizeFirstLetterOfValue(poke.type1),
        poketype2: pp.capitalizeFirstLetterOfValue(poke?.type2),
        multitype: poke.type2 !== undefined,
      });
    }
  };

  await output20PokeInfo();
  // console.log(poke20List);

  res.render('teambuilder', {
    poke20Display: display20Pokes,
  });
});


// router.get('/browse', function(req, res, next) {
//   res.render('');
// });

module.exports = router;


