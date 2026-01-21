import type { CharacterResponse } from "../types/chacter-response"


export const fetchCharacter = async (pageNumber: number): Promise<CharacterResponse> => {
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${pageNumber}`)

    if(!res.ok) throw new Error("Error fetch character")
    return res.json()
}