import {
  Center,
  Menu,
  Text,
  Flex,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  Button,
} from "@chakra-ui/react";

function Displaying({ totalPages, currentPage, setPage }) {
  return (
    <>
      <Center paddingTop={5}>
        <Flex>
          <Text
            fontFamily="Pokemon Solid"
            letterSpacing={2}
          >{`Displaying Page :`}</Text>
          <span>&nbsp;&nbsp;</span>

          <Menu isLazy>
            <Tooltip
              hasArrow
              label="Go to Page"
              placement="bottom"
              bg="#8D9091"
              autoFocus={false}
            >
              <MenuButton
                as={Button}
                paddingTop={1}
                h="max-content"
                variant="ghost"
                colorScheme="red"
                color="red"
                fontFamily="Pokemon Solid"
                letterSpacing={2}
              >
                {currentPage}
              </MenuButton>
            </Tooltip>
            <MenuList maxH="100%">
              {Array(totalPages)
                .fill(0)
                .map((value, index) => {
                  return (
                    <MenuItem
                      key={index}
                      h={5}
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </MenuItem>
                  );
                })}
            </MenuList>
          </Menu>

          <span>&nbsp;&nbsp;</span>
          <Text
            fontFamily="Pokemon Solid"
            letterSpacing={2}
          >{` / ${totalPages}`}</Text>
        </Flex>
      </Center>
    </>
  );
}

export default Displaying;
