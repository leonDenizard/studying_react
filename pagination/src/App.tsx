import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";


interface CharacterProps{

  id: string
  name: string
  status: "Alive" | 'unknown' | 'Dead'
  type: string
  url: string
}
function App() {

  const [currentPage, setCurrentPage] = useState(1);


  const { data, isLoading, error } = useQuery({
    queryKey: ["characters", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character?page=${currentPage}`
      );
      return res.json();
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao buscar os dados...</p>;

  console.log(data);

  return (
    <>
      <ul>
        {data.results.map((character: CharacterProps) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>

      
      <div className="flex gap-4">
        <button
          className="bg-zinc-400"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Pagina anterior
        </button>
        <button
          className="bg-zinc-400"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage > 42}
        >
          Próxima pagina
          
        </button>

        <div>
          {data.info.pages}
        </div>
      </div>
    </>
  );
}

export default App;
