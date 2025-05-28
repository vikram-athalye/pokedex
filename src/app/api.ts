const BASE_URL = "https://pokeapi.co/api/v2";
const SPRITES_BASE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

function getPokemonIdFromUrl(url: string): string {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

//get all pokemon types (used in the select dropdown).
export async function getPokemonTypes(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/type`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon types");
  const data = await res.json();

  return data.results.map((type: { name: string }) => type.name);
}

//get list of pokemon by type (or all if no type is passed).
export async function getPokemonList(
  type: string = ""
): Promise<{ name: string; url: string; image: string }[]> {
  if (type) {
    const res = await fetch(`${BASE_URL}/type/${type}`);
    console.log("res", res);
    if (!res.ok) throw new Error(`Failed to fetch Pokemon for type: ${type}`);
    const data = await res.json();

    return data.pokemon.map((p: any) => {
      const poke = p.pokemon;
      const id = getPokemonIdFromUrl(poke.url);
      return {
        name: poke.name,
        url: poke.url,
        image: `${SPRITES_BASE_URL}/${id}.png`,
      };
    });
  } else {
    const res = await fetch(`${BASE_URL}/pokemon?limit=500`);
    if (!res.ok) throw new Error("Failed to fetch Pokemon list");
    const data = await res.json();
    console.log("data", data);
    return data.results.map((poke: any) => {
      const id = getPokemonIdFromUrl(poke.url);
      return {
        name: poke.name,
        url: poke.url,
        image: `${SPRITES_BASE_URL}/${id}.png`,
      };
    });
  }
}

//get pokemon details by name
export async function getPokemonDetail(name: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/pokemon/${name}`);
  return res ? res.json() : {};
}
