import {
  Box,
  Button,
  Stack,
  Input,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import axios from "axios";

function Signup({ onClose }) {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const toast = useToast();

  const handleSignup = () => {
    if (passwordRef.current.value !== confirmRef.current.value) {
      toast({
        title: "Sign Up Failed",
        description: `Passwords did not match`,
        duration: 2000,
        status: "warning",
      });
      return;
    } else if (passwordRef.current.value.length < 6) {
      toast({
        title: "Sign Up Failed",
        description: `Password not long enough`,
        duration: 2000,
        status: "warning",
      });
      return;
    } else if (
      !nameRef.current.value ||
      !emailRef.current.value ||
      !passwordRef.current.value ||
      !passwordRef.current.value
    ) {
      toast({
        title: "Sign Up Failed",
        description: `Field was missing`,
        duration: 2000,
        status: "warning",
      });
      return;
    } else {
      const newUser = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      axios
        .post(`http://127.0.0.1:8080/pokedex/signup`, newUser)
        .then((response) => {
          if (response.status === 200) {
            onClose();
            toast({
              title: "Sign Up Success",
              description: `New User with Username ${newUser.email} has been created`,
              duration: 3000,
              status: "success",
            });
          }
        })
        .catch((error) => {
          toast({
            title: "Sign Up Failed",
            description: `User with that email already exists or invalid field was provided, try again`,
            duration: 3000,
            status: "warning",
          });
        });
    }
  };

  return (
    <>
      <Stack spacing="24px">
        <Box>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input ref={nameRef} id="name" placeholder="Please enter name" />
        </Box>
        <Box>
          <FormLabel htmlFor="username">Email</FormLabel>
          <Input
            ref={emailRef}
            id="SignUpUsername"
            placeholder="Please enter email"
          />
        </Box>
        <Box>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            ref={passwordRef}
            type="password"
            id="SignUpPassword"
            placeholder="Must be more than 6 chars"
          />
        </Box>
        <Box>
          <FormLabel htmlFor="Confirmpassword">Confirm Password</FormLabel>
          <Input
            ref={confirmRef}
            type="password"
            id="ConfirmSignUpPassword"
            placeholder="Must match password"
          />
        </Box>
        <Button variant="outline" mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme="red" onClick={() => handleSignup()}>
          Signup
        </Button>
      </Stack>
    </>
  );
}

export default Signup;
