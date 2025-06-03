import Image from "next/image";
import CountUpWrapper from "@/app/components/CountUpWrapper";
import PlayCryButton from "@/app/components/PlayCryButton";

type PokemonCardProps = {
  pokemon: {
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
    abilities: { ability: { name: string } }[];
    moves: { move: { name: string } }[];
    height: number;
    weight: number;
    id: number;
    cries: { legacy: string };
  };
};

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <>
      <div className="w-94 h-[520px] mx-4 md:mx-auto bg-gradient-to-br from-yellow-100 to-red-100 border-red-600 rounded-xl shadow-[0_8px_8px_0_rgba(0,0,0,0.4)] overflow-hidden text-red-900 font-mono p-4 opacity-0 animate-fadeIn">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold capitalize">
            {pokemon?.name}{" "}
            <span className="text-sm text-red-500">#{pokemon?.id}</span>
          </h2>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              Height:
              <CountUpWrapper end={pokemon?.height} duration={5} />
            </span>
            <span className="text-sm font-semibold">
              Weight:
              <CountUpWrapper end={pokemon?.weight} duration={5} />
            </span>
          </div>
        </div>
        <div className="mb-4">
          {pokemon.types.map(({ type }) => (
            <span
              key={type?.name}
              className="text-xs bg-red-200 border border-red-400 text-red-800 px-2 py-1 mr-1 rounded-full uppercase font-bold tracking-wide"
            >
              {type?.name}
            </span>
          ))}
        </div>

        <div className="bg-white p-2 rounded-lg shadow-inner border border-yellow-500 flex justify-center mb-2">
          <Image
            src={pokemon?.sprites?.front_default}
            alt={pokemon?.name}
            width={82}
            height={82}
            className="mx-auto mb-2 hover:scale-125 transition-transform duration-700"
          />
        </div>

        <div className="flex gap-4 mb-2 ">
          <div className="text-sm mb-2 pr-4 border-r-1">
            <div className="font-bold text-left mb-1">Base Stats</div>
            {pokemon.stats.map((s) => (
              <div key={s.stat.name} className="flex justify-between text-xs">
                <span className="capitalize mr-6">{s?.stat?.name}</span>
                <span className="font-bold">{s?.base_stat}</span>
              </div>
            ))}
          </div>
          <div className="flex-1 text-sm items-start">
            <div className="font-bold mb-1">Moves</div>
            <ul className="list-disc list-inside text-xs max-h-20 overflow-y-auto">
              {pokemon.moves.slice(0, 5).map((m) => (
                <li key={m.move.name} className="capitalize">
                  {m.move.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1 text-sm border-t-1 pt-2">
          <div className="font-bold text-left mb-1">Abilities</div>
          <ul className="list-disc list-inside text-xs">
            {pokemon.abilities.map((a) => (
              <li key={a.ability.name} className="capitalize">
                {a.ability.name}
              </li>
            ))}
          </ul>
        </div>
        {pokemon.cries.legacy && (
          <div className="w-full flex justify-end mb-2">
            <PlayCryButton src={pokemon.cries.legacy} />
          </div>
        )}
      </div>
    </>
  );
}
