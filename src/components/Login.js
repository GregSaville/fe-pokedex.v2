import {
  Box,
  Button,
  Stack,
  Input,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";

function Login({ onClose }) {
  const toast = useToast();

  const usernameRef = useRef();
  const passwordRef = useRef();

  async function getTrainerInfo() {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    let captured = {};
    await axios
      .get(
        `http://127.0.0.1:8080/pokedex/api/trainers/${localStorage.getItem(
          "user"
        )}`,
        config
      )
      .then((response) => {
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("id", response.data.id);
        response.data.captured.map(
          (pokemon) => (captured[pokemon.id] = pokemon.name)
        );
        localStorage.setItem("captured", JSON.stringify(captured));
      });

    window.location.reload(true);
  }

  const handleLogin = () => {
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    axios
      .post(`http://127.0.0.1:8080/pokedex/login`, user)
      .then((response) => {
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("user", user.username);
        getTrainerInfo();
        toast({
          title: "Login Successful",
          description: `User: ${user.username} logged-in`,
          duration: 2000,
          status: "success",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed Login",
          description: "Username or password invalid",
          duration: 2000,
          status: "warning",
        });
      });
  };

  return (
    <>
      <Stack spacing="24px">
        <Box>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            ref={usernameRef}
            id="username"
            placeholder="Please enter user name"
          />
        </Box>
        <Box>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            ref={passwordRef}
            id="password"
            placeholder="Please enter your password"
            type="password"
          />
        </Box>
        <Button variant="outline" mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme="red" onClick={() => handleLogin()}>
          Login
        </Button>
      </Stack>
    </>
  );
}

export default Login;
