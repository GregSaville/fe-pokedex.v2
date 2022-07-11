import { Center, Box, SimpleGrid, ScaleFade } from "@chakra-ui/react";

import Frame from "./Frame";

function PokemonList({ pokemon, user, captured }) {
  return (
    <SimpleGrid columns={[1, 2, 3, 4, 5]} gap={4}>
      {pokemon.map((pokemon, index) => (
        <Center key={index}>
          <Box>
            <ScaleFade initialScale={0.5} in={true}>
              <Frame pokemon={pokemon} user={user} captured={captured} />
            </ScaleFade>
          </Box>
        </Center>
      ))}
    </SimpleGrid>
  );
}

export default PokemonList;
