"use client";

import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Press_Start_2P } from "next/font/google";
import { filterPokemons } from "../actions";

type PokedexProps = {
  types: string[];
  initialPokemons?: { name: string; url: string; image: string }[];
};

const pressStart2P = Press_Start_2P({
  weight: "400",
});

export default function Pokedex({ types, initialPokemons }: PokedexProps) {
  const [state, formActions] = useActionState(filterPokemons, {
    pokemons: initialPokemons,
  });
  const pokemons = state.pokemons;
  return (
    <section className="max-w-xl sm:max-w-3xl lg:max-w-4xl mx-4 md:mx-auto my-12 p-6 bg-red-800 rounded-xl shadow-lg font-mono text-white select-none opacity-0 animate-fadeIn">
      <h1
        className={`${pressStart2P.className} text-4xl mb-6 text-start drop-shadow-md
      tracking-wide`}
      >
        Pokédex
      </h1>

      <form action={formActions} className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="mb-1 text-yellow-300 text-sm font-semibold tracking-wide">
            Select Pokémon Type
          </span>
          <select
            className="bg-yellow-50 text-red-700 rounded px-3 py-2 outline-none shadow-inner hover:shadow-lg transition"
            defaultValue=""
            name="pokemon-type"
          >
            <option value="" disabled>
              All Types
            </option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-yellow-300 text-sm font-semibold tracking-wide">
            Search Pokémon
          </span>
          <input
            name="pokemon-search"
            type="search"
            placeholder="e.g. Pikachu"
            className="bg-yellow-50 text-red-700 rounded px-3 py-2 outline-none shadow-inner focus:placeholder-red-600 transition"
          />
        </label>

        <button
          type="submit"
          className="w-1/2 md:w-1/3 mx-auto bg-yellow-400 text-red-700 font-bold rounded py-2 mt-2 shadow-lg hover:bg-yellow-300 active:scale-95 transition"
        >
          Search
        </button>
      </form>

      <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 h-64 overflow-y-auto pr-2">
        {pokemons?.map((pokemon, i) => (
          <Link key={pokemon.name} href={`/pokemon/${pokemon.name}`}>
            <li
              key={i}
              className="bg-yellow-50 rounded-lg p-3 text-center shadow-md cursor-pointer hover:scale-105 transition"
            >
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                width={80}
                height={80}
                className="mx-auto mb-2 rounded-full shadow-inner object-contain"
                unoptimized
              />
              <p className="font-semibold text-red-700">
                {pokemon.name.slice(0, 1)?.toUpperCase() +
                  pokemon.name.slice(1)}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}
