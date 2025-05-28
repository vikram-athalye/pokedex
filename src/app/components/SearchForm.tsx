"use client";

import React from "react";

export default function SearchForm({ types, onFilterChange }) {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <select
        className="bg-white text-black px-3 py-2 rounded outline-none"
        name="type"
        onChange={onFilterChange}
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>

      <input
        type="search"
        className="bg-white text-black px-3 py-2 rounded outline-none"
        name="search"
        placeholder="Search Pokémon"
        onChange={onFilterChange}
      />
    </form>
  );
}
