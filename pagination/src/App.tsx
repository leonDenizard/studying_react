import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { CharacterResponse } from "./types/chacter-response";
import CharacterList from "./components/CharactersList";


function App() {
  
  
  return (
    <>
      <CharacterList/>
    </>
  );
}

export default App;
