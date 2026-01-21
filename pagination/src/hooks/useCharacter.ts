import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { CharacterResponse } from "../types/chacter-response";
import { fetchCharacter } from "../services/fetchCharacters";

export default function useCharacter() {

    const [page, setPage] = useState(1);
    const queryClient = useQueryClient()

    const { data, isLoading, error, isError } = useQuery<CharacterResponse>({
        queryKey: ["characters", page],
        queryFn: () => fetchCharacter(page),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5,
    });

    const totalPages = data?.info.pages ?? 0

    useEffect(() => {

        if (page >= totalPages) return

        const id = requestIdleCallback(() => {
            queryClient.prefetchQuery({
                queryKey: ["characters", page + 1],
                queryFn: () => fetchCharacter(page + 1),
                staleTime: 1000 * 60 * 5,
            });

            return () => cancelIdleCallback(id)

        }
        )
    }, [page, totalPages, queryClient])


    const nextPage = () => {

        if (!totalPages) return
        if (page >= totalPages) return
        setPage((prev) => prev + 1)
    }

    const prevPage = () => {
        if (!totalPages) return
        if (page <= 1) return
        setPage((prev) => prev - 1)
    }

    return {
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