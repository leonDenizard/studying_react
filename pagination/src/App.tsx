import { useState } from "react";
import CharacterList from "./components/CharactersList";
import { InfiniteCharacterList } from "./components/InfiniteCharactersList";

type ViewMode = "pagination" | "infinite";

function App() {
  const [view, setView] = useState<ViewMode>("pagination");

  return (
    <>
      <nav>
        <ul className="flex justify-between p-2.5 underline tracking-wider">
          <li>
            <button
              onClick={() => setView("pagination")}
              className={view === "pagination" ? "font-bold" : ""}
            >
              Pagination
            </button>
          </li>

          <li>
            <button
              onClick={() => setView("infinite")}
              className={view === "infinite" ? "font-bold" : ""}
            >
              Infinite Pagination
            </button>
          </li>
        </ul>
      </nav>

      {view === "pagination" && <CharacterList />}
      {view === "infinite" && <InfiniteCharacterList />}
    </>
  );
}

export default App;
