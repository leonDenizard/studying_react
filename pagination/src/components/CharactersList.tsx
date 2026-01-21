import useCharacter from "../hooks/useCharacter";

export default function CharacterList() {
  const { character, page, nextPage, prevPage, isLoading, error } =
    useCharacter();

  if (isLoading) return <p>Carregando dados da API</p>;
  if (error) return <p>Erro ao carregar dados da API</p>;

  return (
    <div className="bg-zinc-900 p-2.5">
      <ul>
        {character.map((c) => (
          <li key={c.id} className="flex gap-3">
            <span className="tabular-nums w-5 text-right">{c.id}</span>
            <span>{c.name}</span>
          </li>
        ))}
      </ul>

      <div className=" flex gap-4">
        <button
          className="bg-zinc-100 text-black p-1 rounded cursor-pointer"
          onClick={prevPage}
          disabled={isLoading}
        >
          Página anterior
        </button>
        <span className="bg-zinc-950 p-1 rounded px-4">{page}</span>
        <button
          className="bg-zinc-100 text-black p-1 rounded cursor-pointer"
          onClick={nextPage}
          disabled={isLoading}
        >
          Próxima Página
        </button>
      </div>
    </div>
  );
}
