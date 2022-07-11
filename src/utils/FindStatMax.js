function findStatMax(stat) {
  switch (stat) {
    case "HP":
      return 255;
    case "Atk":
      return 170;
    case "Def":
      return 230;
    case "Sp.Atk":
      return 180;
    case "Sp.Def":
      return 230;
    case "Speed":
      return 180;
    case "default":
      return 250;
  }
}

export default findStatMax;
