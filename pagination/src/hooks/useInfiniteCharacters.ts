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
        retry: (failureCount, error) => {
            if (error instanceof Error && error.message.includes("Muitas requisições")) {
                return failureCount < 2;
            }
            return false;
        },
        retryDelay: 2000,
    });

    const characters = query.data?.pages.flatMap(page => page.results) ?? [];

    return {
        characters,
        fetchNextPage: query.fetchNextPage,
        hasNextPage: query.hasNextPage,
        isLoading: query.isLoading,
        isFetchingNextPage: query.isFetchingNextPage,
        error: query.error,
        query
    }
}