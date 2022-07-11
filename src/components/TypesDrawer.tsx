import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Radio,
  RadioGroup,
  Stack,
  Center,
  Text,
  Flex,
  Tag,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import Type from "./Type.tsx";

function TypesDrawer({ onClose, isOpen, types, searchByType }) {
  const toast = useToast();
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");

  const handleSubmit = () => {
    let returnString = "";
    if (type1 === type2 || (type2 === "single" && type1 !== "")) {
      returnString = `${type1}~`;
    } else if (type2 === "none" || (!type2 && type1 !== "")) {
      returnString = type1;
    } else if (type1 && type2) {
      returnString = `${type1},${type2}`;
    } else {
      toast({
        title: "Failed Search",
        description: "Search Not Valid",
        duration: 1000,
        status: "warning",
      });
      return;
    }

    handleClose();
    searchByType(returnString);
  };

  const handleClose = () => {
    setType1("");
    setType2("");
    onClose();
  };

  return (
    <>
      <Drawer placement="left" onClose={handleClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px" fontFamily="Pokemon Solid">
              Search By Type
            </DrawerHeader>
            <DrawerCloseButton />
            <DrawerBody>
              <Flex gap="20%">
                <RadioGroup onChange={(value) => setType1(value)}>
                  <Stack>
                    <Text>First Type</Text>
                    {types.map((type, index) => (
                      <Box key={index}>
                        <Radio paddingBottom="3%" value={type}>
                          <Type types={[type]} />
                        </Radio>
                      </Box>
                    ))}
                  </Stack>
                </RadioGroup>
                <RadioGroup onChange={(value) => setType2(value)}>
                  <Stack>
                    <Text>Second Type</Text>
                    {types.map((type, index) => (
                      <Box key={index + 2}>
                        <Radio paddingBottom="3%" value={type}>
                          <Type types={[type]} />
                        </Radio>
                      </Box>
                    ))}
                    <Radio paddingBottom="3%" value="single">
                      <Tag
                        variant={"subtle"}
                        style={{ background: "#8D9091" }}
                        textColor="#FFFAFA"
                        textTransform="capitalize"
                        fontFamily={"Pokemon Solid"}
                      >
                        Single
                      </Tag>
                    </Radio>
                    <Radio paddingBottom="3%" value="none">
                      <Tag
                        variant={"subtle"}
                        style={{ background: "#8D9091" }}
                        textColor="#FFFAFA"
                        textTransform="capitalize"
                        fontFamily={"Pokemon Solid"}
                      >
                        Any
                      </Tag>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Flex>
            </DrawerBody>
            <DrawerFooter>
              <Center>
                <Button
                  bg="#8D9091"
                  textColor="#FFFAFA"
                  textTransform="capitalize"
                  fontFamily={"Pokemon Solid"}
                  onClick={() => handleSubmit()}
                >
                  Submit
                </Button>
              </Center>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default TypesDrawer;
