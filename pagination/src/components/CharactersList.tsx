import useCharacter from "../hooks/useCharacter";

export default function CharacterList() {
  const { character, page, nextPage, prevPage, isLoading, error } =
    useCharacter();

  if (isLoading) return <p>Carregando dados da API</p>;
  if (error) return <p>Erro ao carregar dados da API</p>;

  return (
    <div className="relative bg-zinc-900 p-2.5">
      <ul className="flex flex-col gap-3 mb-8 h-[80vh] overflow-y-scroll">
        {character.map((c) => (
          <li key={c.id} className="flex gap-3">
            <img 
                className="h-12 w-12 rounded-md object-cover bg-zinc-950 opacity-0 transition-opacity duration-200" src={c.image} alt={`Image ${c.name}`}
                loading="lazy"
                onLoad={(e) => e.currentTarget.style.opacity = "1"}
            />
            <span className="tabular-nums w-5 text-right">{c.id}</span>
            <span>{c.name}</span>
          </li>
        ))}
      </ul>

      <div className="relative flex gap-4 justify-center">
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
