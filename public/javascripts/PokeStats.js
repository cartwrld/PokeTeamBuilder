class PokeStats {
  constructor(pStats) {
    // immediately creating an array of stats to work with
    const stats = [];

    for (const stat of pStats) {
      if (stat.base_stat !== undefined) {
        stats.push(stat.base_stat);
      } else {
        console.log('No base_stat available for this object.');
      }
    }

    this.hp = stats[0];
    this.attack = stats[1];
    this.defense = stats[2];
    this.specAtk = stats[3];
    this.specDef = stats[4];
    this.speed = stats[5];
  }
}

module.exports = PokeStats;

