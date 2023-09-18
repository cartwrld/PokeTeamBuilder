const PokeStats = require('./PokeStats');
// const PokeType = require('./PokeType');

class Pokemon {
  // constructor(name, id, baseExp, stats, sprite) {
  constructor(name, id, sprite) {
    this.name = name;
    this.id = id;
    this.sprite = sprite;

    // this.stats = new PokeStats(stats);

    // types are set in the index.js file

    this.setPokeGen(id);
    // this.setPokeType(types);
  }


  setPokeType(poketypes) {
    console.log(poketypes);
    if (poketypes.length > 1) {
      this.types = new PokeType(poketypes[0], poketypes[1]);
    } else {
      this.types = new PokeType(poketypes[0]);
    }
  }
  getPokeTypes() {
    const retArr = [];
    if (this.type2 !== undefined) {
      retArr.push(this.type1);
      retArr.push(this.type2);
      return retArr;
    } else {
      retArr.push(this.type1);
      return retArr;
    }
  }

  setPokeGen(id) {
    const pokeNum = this.id;
    switch (true) {
      case pokeNum <= 151:
        this.gen = 1; break;
      case pokeNum >= 152 && pokeNum < 252:
        this.gen = 2; break;
      case pokeNum >= 252 && pokeNum < 387:
        this.gen = 3; break;
      case pokeNum >= 387 && pokeNum < 495:
        this.gen = 4; break;
      case pokeNum >= 495 && pokeNum < 650:
        this.gen = 5; break;
      case pokeNum >= 650 && pokeNum < 810:
        this.gen = 6; break;
      case pokeNum >= 810 && pokeNum < 906:
        this.gen = 7; break;
      case pokeNum >= 906 && pokeNum < 1022:
        this.gen = 8; break;
      case pokeNum >= 1022:
        this.gen = 9; break;
    }
  }
}

module.exports = Pokemon;
