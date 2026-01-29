import { useState } from "react";
import CharacterList from "./components/CharactersList";
import { InfiniteCharacterList } from "./components/InfiniteCharactersList";

type ViewMode = "pagination" | "infinite";

function App() {
  const [ViewMode, setViewMode] = useState<ViewMode>("pagination");
  return (
    <>
      <ul className="flex justify-center items-center gap-8 h-12">
        <li>
          <button onClick={() => setViewMode("pagination")}
            className={`${ViewMode === "pagination" ? "font-bold underline": ""} cursor-pointer`}>Pagination</button>
        </li>
        <li>
          <button onClick={() => setViewMode("infinite")}
            className={`${ViewMode === "infinite" ? "font-bold underline" : ""} cursor-pointer`}>Infinite Pagination</button>
        </li>
      </ul>

      {ViewMode === "pagination" && <CharacterList/>}
      {ViewMode === "infinite" && <InfiniteCharacterList/>}
    </>
  );
}

export default App;
