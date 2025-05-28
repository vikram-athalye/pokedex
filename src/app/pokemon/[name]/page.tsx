import Link from "next/link";
import PokemonCard from "@/app/components/PokemonCard";
import { getPokemonDetail } from "@/app/api";

export default async function Page({ params }: { params: { name: string } }) {
  const pokemon = await getPokemonDetail(params.name);

  return (
    <>
      <nav className="text-sm m-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/ </span>
        <span className="capitalize font-semibold">{pokemon.name}</span>
      </nav>
      <div className="min-h-screen flex items-start justify-center">
        <PokemonCard pokemon={pokemon} />
      </div>
    </>
  );
}
