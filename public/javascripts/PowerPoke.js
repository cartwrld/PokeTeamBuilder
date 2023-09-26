const Pokemon = require('./Pokemon.js');

class PowerPoke {
  /**
   * Initial fetch to get the length of the resultset in order to generate 10 random Pokemon within the boundaries
   * @return {Promise<any|undefined>} - JSON Object
   */
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

  /**
   * Method used to generate 10 random Pokemon when the homepage is initially loaded.
   * Fetches 10 random Pokemon (may include duplicates) based on the length of the initial resulset.
   * @param initResp - Response from the initial call to get the length of the results
   * @return {Promise<*[]>} - Array of 10 random Pokemon objs
   */
  async get10RandomPokeURLFromInitialFetch(initResp) {
    const rndmPokes = [];
    try {
      // 10 times to generate 10 Pokemon
      for (let i = 0; i < 10; i++) {
        // generate random number is within the resultset
        const randomNum = Math.floor(Math.random() * initResp.results.length);
        // select the URL of the pokemon in the resultset with the random number
        const randPokeURL = initResp.results[randomNum].url;
        // fetch with specific URL corresponding to the randomly chosen pokemon
        const pokeRes = await fetch(randPokeURL);

        if (pokeRes.ok) {
          const randPokeData = await pokeRes.json(); // JSON obj

          const randPoke = this.buildPokeObj(randPokeData); // Pokemon obj
          rndmPokes.push(randPoke);
        }
      }
      return rndmPokes; // Returning an array of 10 Pokemon
    } catch (error) {
      console.error(error);
    }
    return rndmPokes;
  }

  /**
   * Method that can be used for constructing a Pokemon object from the JSON data
   * @param pokeData - JSON Object corresponding to the current random Pokemon
   * @return {Pokemon} - Pokemon to add to the rndmPokes array
   */
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

    return p;
  }

  /**
   * Main method that will format the Pokemon names with a capitalized first letter;
   * @param name - The Pokemon name
   * @return {string} - The formatted Pokemon name
   */
  formatPokeName(name) {
    if (!name.includes(' ') && !name.includes('.') && !name.includes('-')) {
      return this.capitalizeFirstLetterOfValue(name);
    }
    let formattedName = this.handleOddCharsInName(name, ' ');
    formattedName = this.handleOddCharsInName(formattedName, '-');

    return formattedName.trim();
  }

  /**
   * Helper method for the formatPokeName method.
   * Takes in the original name, and the char that you want to split the string at.
   * Returns the formatted version of the name
   *
   * @param nameVal - The name you are dealing with
   * @param char - The char that you would like to split the string at
   * @return {*|string} - The formatted name value
   */
  handleOddCharsInName(nameVal, char) {
    let fixedName = '';
    if (nameVal.includes(char)) {
      const nameArr = nameVal.split(char);
      for (const str of nameArr) {
        fixedName += this.capitalizeFirstLetterOfValue(str) + char;
      }
      return fixedName;
    } else return nameVal;
  }

  /**
   * Helper method for capitalizing the first letter of a word.
   * Designed for formatting Pokemon names and Types.
   * @param value - String you would like to capitalize the first letter of
   * @return {string} - The formatted name
   */
  capitalizeFirstLetterOfValue(value) {
    if (value === null || value === undefined) {
      return;
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}


module.exports = PowerPoke;
