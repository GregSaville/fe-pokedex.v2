import { Box, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import PokemonCard from "./components/PokemonCard";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/pokedex" />} />
          <Route path="/pokedex" element={<MainPage />} />
          <Route path="/pokedex/:pokeId" element={<PokemonCard />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
