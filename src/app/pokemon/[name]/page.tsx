import Link from "next/link";
import { notFound } from "next/navigation";
import PokemonCard from "@/app/components/PokemonCard";
import { getPokemonDetail } from "@/app/api";

export default async function Page({ params }: { params: { name: string } }) {
  const pokemon = await getPokemonDetail(params.name);
  return (
    <>
      <nav className="text-sm m-4 opacity-0 animate-fadeIn">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/ </span>
        <span className="capitalize font-semibold">{pokemon?.name}</span>
      </nav>
      {pokemon ? (
        <div className="min-h-screen ">
          <PokemonCard pokemon={pokemon} />
        </div>
      ) : (
        notFound()
      )}
    </>
  );
}
