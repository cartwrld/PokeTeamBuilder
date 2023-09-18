class PokeStats {
  constructor(stats) {
    this.hp = stats[0].base_stat;
    this.attack = stats[1].base_stat;
    this.defense = stats[2].base_stat;
    this.specAtk = stats[3].base_stat;
    this.specDef = stats[4].base_stat;
    this.speed = stats[5].base_stat;
  }
}

module.exports = PokeStats;
