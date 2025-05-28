// app/pokedex/page.tsx
import { getPokemonTypes, getPokemonList } from "@/app/api";
import Pokedex from "./components/Pokedex";

export default async function PokédexPage() {
  const types = await getPokemonTypes();
  const pokemons = await getPokemonList();

  return <Pokedex types={types} pokemons={pokemons} />;
}
