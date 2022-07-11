import {
  Progress,
  ProgressLabel,
  Grid,
  Text,
  Center,
  GridItem,
} from "@chakra-ui/react";
import findStatMax from "../utils/FindStatMax";

function StatsRow({ stat, category }) {
  const statMax = findStatMax(category);

  return (
    <>
      <Grid templateColumns="repeat(12, 1fr)">
        <GridItem colSpan={2}>
          <Text fontFamily="Pokemon Solid" fontSize={15}>
            {category}:
          </Text>
        </GridItem>

        <GridItem colSpan={10}>
          <Progress
            bgColor="#8D9091"
            colorScheme="red"
            max={statMax}
            value={stat}
            hasStripe={true}
            isAnimated={true}
            h="100%"
            w="100%"
            border="5px black"
            borderStyle="unset"
            borderRadius={"4px"}
          >
            <ProgressLabel textAlign="start" paddingLeft={1} fontSize={18}>
              {stat}
            </ProgressLabel>
          </Progress>
        </GridItem>
      </Grid>
    </>
  );
}

export default StatsRow;
