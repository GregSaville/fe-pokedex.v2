import { Image, Center, Text } from "@chakra-ui/react";
import notFound from "../images/notFound.gif";

function NotFound() {
  return (
    <>
      <Center paddingTop={150}>
        <Image
          border="2px black"
          borderStyle="outset"
          borderRadius={"8px"}
          src={notFound}
        ></Image>
      </Center>
      <Center>
        <Text fontFamily="Pokemon Solid" letterSpacing={2}>
          No Pokemon Found
        </Text>
      </Center>
    </>
  );
}

export default NotFound;
