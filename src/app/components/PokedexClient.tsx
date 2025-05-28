"use client";

import { useActionState, useEffect, useState } from "react";
import { filterPokemons } from "../actions";

type PokedexProps = {
  types: string[];
  initialPokemons?: { name: string; url: string; image: string }[];
};

export default function Pokedex({ types, initialPokemons }: PokedexProps) {
  const [state, formActions] = useActionState(filterPokemons, {
    pokemons: initialPokemons,
  });
  const pokemons = state.pokemons;
  console.log("pokemons", pokemons);
  return (
    <section
      className="max-w-md 
        mx-auto
        p-6
        bg-red-800
        rounded-xl
        shadow-lg
        font-mono
        text-white
        select-none"
    >
      <h1
        className="text-4xl
      font-bold
      mb-6
      text-center
      drop-shadow-md
      tracking-wide"
      >
        Pokédex
      </h1>

      <form action={formActions} className="flex flex-col gap-4">
        {/* Type selector */}
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

        {/* Search input */}
        <label className="flex flex-col">
          <span className="mb-1 text-yellow-300 text-sm font-semibold tracking-wide">
            Search Pokémon
          </span>
          <input
            name="pokemon-search"
            type="search"
            placeholder="e.g. Pikachu"
            className="bg-yellow-50 text-red-700 rounded px-3 py-2 outline-none shadow-inner placeholder-red-400 focus:placeholder-red-600 transition"
          />
        </label>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-yellow-400 text-red-700 font-bold rounded py-2 mt-2 shadow-lg hover:bg-yellow-300 active:scale-95 transition"
        >
          Search
        </button>
      </form>

      {/* Pokemon cards */}
      <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-5">
        {pokemons?.map((pokemon, i) => (
          <li
            key={i}
            className="bg-yellow-50 rounded-lg p-3 text-center shadow-md cursor-pointer hover:scale-105 transition"
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-20 h-20 mx-auto mb-2 rounded-full shadow-inner object-contain"
            />
            <p className="font-semibold text-red-700 capitalize">
              {pokemon?.name}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
