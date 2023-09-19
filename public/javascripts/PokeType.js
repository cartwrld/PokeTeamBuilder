class PokeType {
  constructor(pTypes) {
    console.log(pTypes);
    const typeArr = [];
    for (const t of pTypes) {
      if (t.type.name !== undefined) {
        typeArr.push(t.type.name);
      } else {
        console.log('No base_stat available for this object.');
      }
    }
    // console.log(typeArr.types + '+');
  }
}

module.exports = PokeType;

