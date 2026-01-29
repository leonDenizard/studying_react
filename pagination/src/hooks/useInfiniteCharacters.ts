import { fetchCharacter } from "../services/fetchCharacters";
import { getURL } from "../utils/getURL";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useInfiniteCharacters() {



    const query = useInfiniteQuery({
        queryKey: ["characters", "infinite"],
        initialPageParam: 1,
        queryFn: ({ pageParam }) => fetchCharacter(pageParam),
        getNextPageParam: (lastPage) =>
            getURL(lastPage.info.next),
        staleTime: 1000 * 60 * 5,
    });

    const characters = query.data?.pages.flatMap(page => page.results) ?? [];
    console.log(characters)
    return {
        characters,
        fetchNextPage: query.fetchNextPage,
        hasNextPage: query.hasNextPage,
        isLoading: query.isLoading,
        isFetchingNextPage: query.isFetchingNextPage,
        error: query.error,
    }
}