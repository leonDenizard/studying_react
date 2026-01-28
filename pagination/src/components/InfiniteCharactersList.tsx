import useInfiniteCharacters from "../hooks/useInfiniteCharacters";

export function InfiniteCharacterList() {
  const {
    characters,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteCharacters();

  if (isLoading) {
    return <p>Carregando personagens...</p>;
  }

  if (error instanceof Error) {
    return <p>Erro: {error.message}</p>;
  }

  return (
     <div className="relative bg-zinc-900 p-2.5">
      <ul className="grid md:grid-cols-2 gap-1 justify-center items-center mb-8 h-[75vh] overflow-y-scroll">
        {characters.map((c) => (
          <li key={c.id} className="flex gap-3 items-center">
            <img 
                className="h-12 w-12 rounded-md object-cover bg-zinc-950 opacity-0 transition-opacity-300" src={c.image} alt={`Image ${c.name}`}
                loading="lazy"
                onLoad={(e) => e.currentTarget.style.opacity = "1"}
            />
            <span className="tabular-nums w-5 text-right">{c.id}</span>
            <span>{c.name}</span>
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <div className="flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
          >
            {isFetchingNextPage ? "Carregando mais..." : "Carregar mais"}
          </button>
        </div>
      )}
    </div>
  );
}
