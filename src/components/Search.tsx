import {
  Button,
  Center,
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";

import TypesDrawer from "./TypesDrawer.tsx";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  Search2Icon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import UserOptions from "./UserOptions.tsx";

function Search({ updatePage, searchByName, clearSearch, searchByType }) {
  const [types, setTypes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");

  const handleClear = () => {
    setText("");
    clearSearch();
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/pokedex/api/types`)
      .then((response) => response.json())
      .then((data) => {
        setTypes(data);
      });
  }, []);

  return (
    <>
      <Box>
        <Center>
          <Flex gap={15}>
            <Button
              leftIcon={<ArrowBackIcon />}
              alignSelf="flex-start"
              onClick={() => updatePage(-1)}
              borderRadius="8px"
              colorScheme="red"
            />
            <Button
              rightIcon={<ArrowForwardIcon />}
              alignSelf="flex-end"
              colorScheme="red"
              onClick={() => updatePage(1)}
            />
            <Tooltip
              hasArrow
              label="Search by Types"
              placement="top"
              bg="#8D9091"
            >
              <IconButton
                colorScheme="red"
                icon={<Search2Icon />}
                onClick={onOpen}
              />
            </Tooltip>

            <Box
              display={"flex"}
              border="2px black"
              borderStyle="outset"
              borderRadius={"8px"}
            >
              <Editable
                placeholder="Search"
                value={text}
                minWidth={150}
                onChange={(input) => setText(input)}
                onSubmit={() => searchByName(text)}
              >
                <EditablePreview
                  width={"100%"}
                  h="100%"
                  paddingLeft={2}
                  background="white"
                />
                <EditableInput
                  width={"100%"}
                  h="100%"
                  paddingLeft={2}
                  background="white"
                />
              </Editable>
            </Box>
            <Tooltip hasArrow label="Clear Search" placement="top" bg="#8D9091">
              <IconButton
                colorScheme="red"
                icon={<DeleteIcon />}
                onClick={() => handleClear()}
              />
            </Tooltip>

            <Box alignContent="flex-end">
              <UserOptions />
            </Box>
          </Flex>
        </Center>
      </Box>
      <TypesDrawer
        isOpen={isOpen}
        onClose={onClose}
        types={types}
        searchByType={(input) => {
          setText("");
          searchByType(input);
        }}
      />
    </>
  );
}

export default Search;
