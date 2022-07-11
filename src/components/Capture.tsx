import { Button, Image, Tooltip, useToast } from "@chakra-ui/react";
import filled from "../images/filled.png";
import empty from "../images/empty.png";
import { useState } from "react";
import axios from "axios";

function Capture({ id }) {
  const captured = JSON.parse(localStorage.getItem("captured"));
  const [isCaptured, setIsCaptured] = useState(captured.hasOwnProperty(id));
  const trainerId = localStorage.getItem("id");
  const toast = useToast();

  let config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "text/plain",
    },
  };

  const handleCapture = () => {
    let capturedList = {};
    axios
      .put(
        `http://127.0.0.1:8080/pokedex/api/trainers/${trainerId}/captured`,
        id,
        config
      )
      .then((r) => {
        setIsCaptured(true);
        r.data.captured.map(
          (pokemon) => (capturedList[pokemon.id] = pokemon.name)
        );
        localStorage.setItem("captured", JSON.stringify(capturedList));
        toast({
          title: "Pokemon Captured!",
          description: `Pokemon #${id} has been captured!`,
          duration: 1500,
          status: "success",
        });
      })
      .catch((e) => {
        toast({
          title: "Failed Captured",
          description: `Session has expired : log-in again`,
          duration: 1500,
          status: "warning",
        });
      });
  };

  return (
    <>
      {isCaptured ? (
        <Image
          w="10%"
          left={1}
          top={98}
          borderRadius={12}
          position="absolute"
          src={filled}
          alt="captured"
        ></Image>
      ) : (
        <Tooltip hasArrow label="Capture Pokemon" placement="top" bg="#8D9091">
          <Button
            onClick={() => handleCapture()}
            w="10%"
            left={1}
            top={98}
            borderRadius={12}
            position="absolute"
            style={{
              color: "inherit",
              padding: 0,
              font: "inherit",
              cursor: "pointer",
              outline: "inherit",
            }}
          >
            <Image w="100%" src={empty} alt="captured"></Image>
          </Button>
        </Tooltip>
      )}
    </>
  );
}

export default Capture;
