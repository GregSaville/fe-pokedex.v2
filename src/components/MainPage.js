import Search from "./Search.tsx";
import PokemonList from "./PokemonList.tsx";
import { useEffect, useState } from "react";
import { Box, useToast, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import NotFound from "./NotFound.tsx";
import Displaying from "./Displaying";
import { BrowserView, isBrowser, isMobile } from "react-device-detect";

function MainPage() {
  const [pokemon, setPokemon] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useSearchParams({ page: 1 });
  const toast = useToast();

  const userDetails = localStorage.getItem("name");
  const captured = localStorage.getItem("captured");
  const user = localStorage.getItem("user");

  const page = search.get("page");
  const name = search.get("name");
  const type = search.get("type");
  const link = `http://127.0.0.1:8080/pokedex/api/pokemon`;

  const updatePage = (update) => {
    const newPage = parseInt(page) + update;
    if (newPage < 1 || newPage > totalPages) {
      toast({
        title: "Failed Page Navigation",
        description: "Page Not in Range",
        duration: 1000,
        status: "warning",
      });
      return;
    } else if (name) {
      setSearch({ name: name, page: newPage });
    } else if (type) {
      setSearch({ type: type, page: newPage });
    } else {
      setSearch({ page: newPage });
    }
  };

  function setPage(newPage) {
    if (name) {
      setSearch({ name: name, page: newPage });
    } else if (type) {
      setSearch({ type: type, page: newPage });
    } else {
      setSearch({ page: newPage });
    }
  }

  function clearSearch() {
    setSearch({ page: 1 });
  }

  function searchByName(input) {
    if (input) {
      setSearch({ name: input, page: 1 });
    } else {
      setSearch({ page: page });
    }
  }

  function searchByType(input) {
    if (input === "~" || input === "") {
      toast({
        title: "Failed Search",
        description: "Search Not Valid",
        duration: 1000,
        isClosable: true,
        status: "warning",
      });
      setSearch({});
    } else {
      setSearch({ type: input, page: 1 });
    }
  }

  const findParams = () => {
    //-1 is for the api offset, page 1 is page 0
    if (name) {
      return `?page=${page - 1}&name=${name}`;
    }
    if (type) {
      return `?page=${page - 1}&type=${type}`;
    } else {
      return `?page=${page - 1}`;
    }
  };

  async function fetchPokemon() {
    const params = findParams();
    await fetch(`${link}${params}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.content.length > 0) {
          setPokemon(data.content);
          setTotalPages(data.totalPages);
        } else {
          setPokemon([]);
          setTotalPages(0);
          setSearch({ page: 0 });
        }
      })
      .catch((e) => {
        setPokemon([]);
        setTotalPages(0);
        setSearch({ page: 0 });
      });
  }

  useEffect(() => {
    fetchPokemon();
  }, [page, name, type]);

  return (
    <>
      <Box paddingTop={3}>
        {user && isBrowser && (
          <Text
            position="absolute"
            opacity={{ sm: "0%", md: "0%", lg: "100%" }}
            fontFamily={"Pokemon Solid"}
            letterSpacing={2}
            left={25}
            top={25}
            textTransform="capitalize"
          >
            :Trainer {userDetails} logged-in:
          </Text>
        )}
        <BrowserView>
          <Text
            position="absolute"
            opacity={{ sm: "0%", md: "0%", lg: "100%" }}
            fontFamily={"Pokemon Solid"}
            fontSize={30}
            color="red"
            textShadow="1.8px 1px black"
            letterSpacing={2}
            right={25}
            top={25}
            textTransform="capitalize"
          >
            Pokédex
          </Text>
        </BrowserView>
        <Search
          updatePage={updatePage}
          searchByName={searchByName}
          clearSearch={clearSearch}
          searchByType={searchByType}
        />
        <Displaying
          totalPages={totalPages}
          currentPage={page}
          setPage={setPage}
        />
        <Box paddingTop="5">
          {pokemon.length > 0 ? (
            <PokemonList pokemon={pokemon} captured={captured} user={user} />
          ) : (
            <NotFound />
          )}
        </Box>
      </Box>
    </>
  );
}

export default MainPage;
