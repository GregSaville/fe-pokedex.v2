import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Center,
  Flex,
  Box,
  Divider,
  Tooltip,
  Text,
  Grid,
  GridItem,
  useDisclosure,
  Kbd,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Type from "./Type.tsx";
import findTypeColor from "../utils/FindTypeColor";
import Stats from "./Stats.tsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Capture from "./Capture.tsx";
import CircularStats from "./CircularStats.tsx";
import { BrowserView } from "react-device-detect";

function PokemonCard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isShiny, setIsShiny] = useState(false);
  const params = useParams();
  const [pokemon, setPokemon] = useState(null);
  const nav = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/pokedex/api/pokemon/${params.pokeId}`)
      .then((data) => {
        setPokemon(data.data);
      });
  }, []);

  useEffect(() => {
    if (pokemon !== null) {
      onOpen();
    }
  }, [pokemon]);

  const handleClose = () => {
    onClose();
    setIsShiny(false);
    nav(-1);
  };

  return (
    <>
      <Center paddingTop={250}>
        <Link to={"/pokedex"}>
          <Button>Home</Button>
        </Link>
      </Center>
      {pokemon && (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalOverlay
            backdropFilter="auto"
            backdropBlur="20px"
            bgGradient={
              pokemon.type.length === 2
                ? `linear(to-l, ${findTypeColor(
                    pokemon.type[1]
                  )}, ${findTypeColor(pokemon.type[0])})`
                : `linear(to-l, ${findTypeColor(
                    pokemon.type[0]
                  )}, ${findTypeColor(pokemon.type[0])})`
            }
          />
          <ModalContent>
            <ModalHeader>
              <Flex
                justifyContent="space-between"
                paddingTop={5}
                paddingBottom={3}
              >
                {user && <Capture id={pokemon.id} />}
                <Box
                  fontFamily={"Pokemon Solid"}
                  fontSize="120%"
                  color="#8D9091"
                  letterSpacing={3}
                >{`#${pokemon.id}`}</Box>
                <Box
                  fontFamily={"Pokemon Solid"}
                  fontSize="120%"
                  letterSpacing={3}
                >
                  {pokemon.name}
                </Box>
                <Box>
                  <Tooltip
                    hasArrow
                    label="Toggle Shiny"
                    placement="top"
                    bg="#8D9091"
                  >
                    <Button
                      onClick={() => setIsShiny(!isShiny)}
                      variant="ghost"
                      autoFocus="falsey"
                    >
                      <Center>
                        <Image
                          src={isShiny ? pokemon.shinySprite : pokemon.sprite}
                          alt={pokemon.name}
                        />
                      </Center>
                    </Button>
                  </Tooltip>
                </Box>
              </Flex>
              <Center paddingBottom={2}>
                <Type types={pokemon.type} />
              </Center>
              <ModalCloseButton />
              <Center>
                <Divider orientation="horizontal" w="75%" />
              </Center>
            </ModalHeader>

            <ModalBody paddingTop={2}>
              <Center>
                <Image
                  src={isShiny ? pokemon.shinyGif : pokemon.gif}
                  alt={pokemon.name}
                  minW="40%"
                  paddingBottom={2}
                />
              </Center>
              <Center>
                <Divider orientation="horizontal" w="50%" />
              </Center>
              <Center paddingTop={2} paddingBottom={2}>
                <Box
                  fontFamily={"Pokemon Solid"}
                  fontSize="120%"
                  color="#8D9091"
                >{`The ${pokemon.genus}`}</Box>
              </Center>
              <CircularStats
                stats={pokemon.stats}
                color={
                  pokemon.type.length === 2
                    ? findTypeColor(pokemon.type[1])
                    : findTypeColor(pokemon.type[0])
                }
              />
              <Center paddingTop={4}>
                <Text align="center">{pokemon.description}</Text>
              </Center>
            </ModalBody>

            <Center>
              <Divider orientation="horizontal" w="50%" />
            </Center>

            <ModalFooter w="100%">
              <Grid
                templateColumns="repeat(4, 1fr)"
                templateRows="repeat(3, 1fr)"
                w="100%"
              >
                <GridItem colSpan={1} rowSpan={1} paddingBottom={3}>
                  <Text>{`Height: `}</Text>
                </GridItem>
                <GridItem colSpan={1} rowSpan={1}>
                  <Text>{`${pokemon.height} m`}</Text>
                </GridItem>
                <GridItem colSpan={1} rowSpan={1}>
                  <Text>{`Weight: `}</Text>
                </GridItem>
                <GridItem colSpan={1} rowSpan={1}>
                  <Text>{`${pokemon.weight} kg`}</Text>
                </GridItem>
                <GridItem colStart={1} colSpan={1} rowStart={2} rowSpan={1} paddingBottom={3}>
                  <Text>{`Abilities:`}</Text>
                </GridItem>
                <GridItem colStart={3} colSpan={3} rowStart={2} rowSpan={1}>
                  <Text textTransform="capitalize">
                    {pokemon.abilities.join(", ")}
                  </Text>
                </GridItem>
                <GridItem colStart={1} colSpan={1} rowStart={3} rowSpan={1}>
                  <Text>{`Egg Groups:`}</Text>
                </GridItem>
                <GridItem colStart={3} colSpan={3} rowStart={3} rowSpan={1}>
                  <Text textTransform="capitalize">
                    {pokemon.eggGroups.join(", ")}
                  </Text>
                </GridItem>
              </Grid>
            
             <BrowserView>
              <span>
                <Tooltip hasArrow placement='right' label="To Return Home">
                  <Kbd>esc</Kbd>
                  </Tooltip>
              </span>
              </BrowserView>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default PokemonCard;
