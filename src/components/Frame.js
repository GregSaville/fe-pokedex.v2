import { Box, Button, Image, Heading } from "@chakra-ui/react";
import "../css/font.css";
import Type from "./Type.tsx";
import filled from "../images/filled.png";
import empty from "../images/empty.png";
import { Link } from "react-router-dom";

function Frame({ pokemon, captured, user }) {
  let isCaptured = null;
  let captureList = null;

  if (user) {
    captureList = JSON.parse(captured);
    isCaptured = captureList[pokemon.id];
  }

  return (
    <>
      <Link to={`/pokedex/${pokemon.id}`} style={{ textDecoration: "none" }}>
        
        <Button
          width={{ sm: 225, md: 225, lg: 250, xl: 250, "2xl": 300 }}
          border="12px"
          borderStyle='outset'
          borderRadius={{ "sm": 75,"md" : 100}}
          h={{ sm: 225, md: 225, lg: 225, xl: 250, "2xl": 250 }}
          background='white'
          variant='outline'
        >
          <Box>
            <Box>
              {user ? (
                <>
                  <Heading
                    fontFamily={"Pokemon Solid"}
                    fontSize="125%"
                    letterSpacing={2}
                    textAlign="center"
                  >
                    {pokemon.name}
                  </Heading>
                  <Image
                    w="15%"
                    left={-2}
                    top={-1}
                    position="absolute"
                    src={isCaptured ? filled : empty}
                    alt="captured"
                  ></Image>
                </>
              ) : (
                <Heading
                  fontFamily={"Pokemon Solid"}
                  fontSize="125%"
                  letterSpacing={3}
                  textAlign="center"
                >
                  {pokemon.name}
                </Heading>
              )}
            </Box>

            <Box paddingTop={{ sm: 1, md: 2, lg: 3, xl: 5, "2xl": 6 }}>
              <Image src={pokemon.image} alt={pokemon.name} />
            </Box>

            <Box paddingTop={{ sm: 1, md: 2, lg: 3, xl: 5, "2xl": 6 }}>
              <Type types={pokemon.type} />
            </Box>
          </Box>
        </Button>
      </Link>
    </>
  );
}

export default Frame;
