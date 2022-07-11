import {
  CircularProgress,
  CircularProgressLabel,
  GridItem,
  Text,
} from "@chakra-ui/react";
import findStatMax from "../utils/FindStatMax";

function StatCircle({ stat, category, index, colIndex, color }) {
  const statMax = findStatMax(category);

  return (
    <>
      <GridItem colSpan={1} colStart={colIndex} rowSpan={1} rowStart={index}>
        <Text fontFamily="Pokemon Solid" fontSize={15} paddingTop={15}>
          {category}:
        </Text>
      </GridItem>
      <GridItem
        colSpan={1}
        colStart={colIndex + 1}
        rowSpan={1}
        rowStart={index}
        paddingBottom={5}
      >
        <CircularProgress value={(stat / statMax) * 100} color={color}>
          <CircularProgressLabel fontFamily="Pokemon Solid" fontSize={15}>
            {stat}
          </CircularProgressLabel>
        </CircularProgress>
      </GridItem>
    </>
  );
}

export default StatCircle;
