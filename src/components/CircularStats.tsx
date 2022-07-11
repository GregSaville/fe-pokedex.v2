import { Grid, GridItem } from "@chakra-ui/react";
import StatCircle from "../components/StatCircle";
function CircularStats({ stats, color }) {
  return (
    <Grid templateColumns="repeat(2, 1fr)" templateRows="repeat(3, 1fr">
      <StatCircle
        stat={stats.hp}
        category="HP"
        index={1}
        colIndex={1}
        color={color}
      />
      <StatCircle
        stat={stats.attack}
        category="Atk"
        index={1}
        colIndex={3}
        color={color}
      />
      <StatCircle
        stat={stats.defense}
        category="Def"
        index={2}
        colIndex={1}
        color={color}
      />
      <StatCircle
        stat={stats.specialAttack}
        category="Sp.Atk"
        index={2}
        colIndex={3}
        color={color}
      />
      <StatCircle
        stat={stats.specialDefense}
        category="Sp.Def"
        index={3}
        colIndex={1}
        color={color}
      />
      <StatCircle
        stat={stats.speed}
        category="Speed"
        index={3}
        colIndex={3}
        color={color}
      />
    </Grid>
  );
}

export default CircularStats;
