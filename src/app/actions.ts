"use server";

import { getPokemonList, getPokemonTypes, getPokemonDetail } from "@/app/api";

//Server action to get pokemon types (used once on page load).
export async function fetchTypesAction() {
  return await getPokemonTypes();
}

//server action to fetch pokemon list based on type and search query
export async function fetchPokemonListAction({
  type,
  search,
}: {
  type: string;
  search: string;
}) {
  let list = await getPokemonList(type);

  if (search) {
    list = list.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return list.map((p) => p.name); // keep only names
}

export async function filterPokemons(prevState: any, formData: FormData) {
  const type = formData.get("pokemon-type") as string;
  const search = formData.get("pokemon-search") as string;

  let pokemons = await getPokemonList(type);
  if (search) {
    pokemons = pokemons.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return { pokemons };
}
