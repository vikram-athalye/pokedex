const BASE_URL = "https://pokeapi.co/api/v2";
const SPRITES_BASE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

function getPokemonIdFromUrl(url: string): string {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1]; // last segment is the ID
}

/**
 * Get all Pokémon types (used in the select dropdown).
 */
export async function getPokemonTypes(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/type`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon types");
  const data = await res.json();

  return data.results.map((type: { name: string }) => type.name);
}

/**
 * Get list of Pokémon by type (or all if no type is passed).
 * Note: This is a simplified list, just names & urls.
 */
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
    const res = await fetch(`${BASE_URL}/pokemon?limit=12`);
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

export async function getPokemonDetail(name: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/pokemon/${name}`);
  if (!res.ok) throw new Error(`Failed to fetch Pokemon detail: ${name}`);

  return res.json();
}
