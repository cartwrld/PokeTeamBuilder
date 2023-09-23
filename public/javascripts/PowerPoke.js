const Pokemon = require('./Pokemon.js');

class PowerPoke {
  async getInitialPokeCountWithURL() {
    try {
      const getPokeCountData = async () => {
        const res1 = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
        if (res1.ok) {
          const countData = await res1.json();
          console.log(countData.results.length);
          return countData;
        }
      };
      return await getPokeCountData();
    } catch (error) {
      console.error(error);
    }
  }

  async get10RandomPokeURLFromInitialFetch(initResp) {
    // console.log('=============');
    // console.log(initResp);
    // console.log('=============');
    const rndmPokes = [];
    try {
      // console.log(initResp.results[5].name);
      for (let i = 0; i < 10; i++) {
        // generate random number is within the resultset
        const randomNum = Math.floor(Math.random() * initResp.results.length);
        // select the URL of the pokemon in the resultset with the random number
        const randPokeURL = initResp.results[randomNum].url;

        // fetch with specific URL corresponding to the randomly chosen pokemon
        const pokeRes = await fetch(randPokeURL);
        if (pokeRes.ok) {
          const randPokeData = await pokeRes.json(); // Wait for the JSON parsing to complete

          // console.log(randPokeData);

          const randPoke = this.buildPokeObj(randPokeData);
          rndmPokes.push(randPoke);
        }
      }
      // await getPokeURLData();
      // console.log(rndmPokes);
      return rndmPokes;
    } catch (error) {
      console.error('**********' + error + '**********');
    }
    return rndmPokes;
  }

  buildPokeObj(pokeData) {
    // console.log(pokeData);
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

    // console.log(p);
    return p;
  }
}

module.exports = PowerPoke;
