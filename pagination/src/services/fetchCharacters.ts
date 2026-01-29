import type { CharacterResponse } from "../types/chacter-response"


export const fetchCharacter = async (pageNumber: number): Promise<CharacterResponse> => {
    

    
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character?page=${pageNumber}`)
  
      if (!res.ok) {
      if (res.status === 429) {
        throw new Error("Muitas requisições. Aguarde um momento.");
      }
  
      throw new Error("Erro ao carregar personagens");
    }
    
    return res.json()
  } catch (err) {
    console.log(err)
    throw new Error("Falha de conexão ou limite de requisições atingido")
  }
}