const Pokemon = require('./Pokemon.js');

class PowerPoke {
  buildPokeObj(pokeData) {
    const p = new Pokemon(
        pokeData.name,
        pokeData.id,
        pokeData.sprites.front_default,
        pokeData.stats,
        pokeData.types[0].type.name,
    );

    if (pokeData.types.length > 1) {
      p.type2 = pokeData.types[1].type.name;
    }

    console.log(p);
    return p;
  }
}
module.exports = PowerPoke;
