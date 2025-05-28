import PokedexClient from "./PokedexClient";

export default function Pokedex({ types, pokemons }: any) {
  return <PokedexClient types={types} initialPokemons={pokemons} />;
}
