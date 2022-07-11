import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Menu,
  MenuList,
  Select,
  SelectField,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import Login from "./Login";
import Signup from "./Signup";

function UserOptions() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = localStorage.getItem("name");

  return (
    <>
      <Tooltip hasArrow label="Login / Signup" placement="top" bg="#8D9091">
        <IconButton
          colorScheme="red"
          icon={<AtSignIcon />}
          onClick={onOpen}
          aria-label={"SignIn"}
        ></IconButton>
      </Tooltip>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Tabs>
            <DrawerHeader borderBottomWidth="1px">
              <TabList>
                <Tab>Log-in</Tab>
                <Tab>Sign-up</Tab>
              </TabList>
            </DrawerHeader>

            <DrawerBody>
              <TabPanels>
                <TabPanel>
                  {user ? (
                    <Text textTransform="capitalize" letterSpacing={2}>
                      Current User: {user}
                    </Text>
                  ) : (
                    <Login onClose={onClose} />
                  )}
                </TabPanel>
                <TabPanel>
                  {user ? (
                    <Text textTransform="capitalize" letterSpacing={2}>
                      Current User: {user}
                    </Text>
                  ) : (
                    <Signup onClose={onClose} />
                  )}
                </TabPanel>
              </TabPanels>
            </DrawerBody>
          </Tabs>
          <DrawerFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                onClose();
                localStorage.clear();
                window.location.reload();
              }}
            >
              Sign Out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default UserOptions;
