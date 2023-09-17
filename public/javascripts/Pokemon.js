class Pokemon {
  constructor(name, id, baseExp, stats, sprite) {
    this.name = name;
    this.id = id;
    this.baseExp = baseExp;
    this.stats = stats;
    this.sprite = sprite;


    // this.gen = this.set_poke_gen();
    // this.poketype = this.get_poketypes();
  }
}
module.exports = Pokemon;
