import { Stack } from "@chakra-ui/react";
import StatsRow from "./StatsRow.tsx";

function Stats({ stats }) {
  return (
    <>
      <Stack width="100%">
        <StatsRow stat={stats.hp} category="HP" />
        <StatsRow stat={stats.attack} category="Atk" />
        <StatsRow stat={stats.defense} category="Def" />
        <StatsRow stat={stats.specialAttack} category="Sp.Atk" />
        <StatsRow stat={stats.specialDefense} category="Sp.Def" />
        <StatsRow stat={stats.speed} category="Speed" />
      </Stack>
    </>
  );
}

export default Stats;
