import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { CharacterResponse } from "../types/chacter-response";
import { fetchCharacter } from "../services/fetchCharacters";

export default function useCharacter() {

    const [page, setPage] = useState(1);

    const { data, isLoading, error, isError } = useQuery<CharacterResponse>({
        queryKey: ["characters", page],
        queryFn: () => fetchCharacter(page),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5,
    });

    const totalPages = data?.info.pages ?? 0

    const nextPage = () =>{

        if(!totalPages) return
        if(page >= totalPages) return
        setPage((prev) => prev + 1)
    }

    const prevPage = () =>{
        if(!totalPages) return
        if(page <= 1) return
        setPage((prev) => prev - 1)
    }
    
    return{
        character: data?.results ?? [],
        page,
        totalPages,
        isLoading,
        isError,
        error,
        nextPage,
        prevPage
    }
}