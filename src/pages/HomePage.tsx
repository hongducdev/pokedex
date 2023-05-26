import { useState, useEffect } from "react";
import Header from "../components/Header";
import { PokemonList } from "../types";
import { getPokemonList } from "../api/pokemonServices";
import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading";

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const limit = 20;
  const [offset, setOffset] = useState<number>(0);
  const [pokemonList, setPokemonList] = useState<PokemonList[]>([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        const response = await getPokemonList(limit, offset);
        setPokemonList(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [offset, limit]);

  const handleNextClick = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handlePrevClick = () => {
    if (offset === 0) return;

    setOffset((prevOffset) => prevOffset - limit);
  };

  return (
    <div>
      {loading && (
        <div className="w-full min-h-screen flex items-center justify-center">
          <Loading />
        </div>
      )}
      {error && (
        <div className="w-full min-h-screen flex items-center justify-center">
          Error...
        </div>
      )}
      {!loading && !error && (
        <div className="w-[90vw] px-10">
          <div className="text-center py-[50px]">
            <span className="text-transparent bg-gradient-to-r from-ctp-blue to-ctp-pink text-7xl font-bold bg-clip-text">
              PokéDex!
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {pokemonList.map((pokemon) => (
              <div key={pokemon.name}>
                <PokemonCard name={pokemon.name} />
              </div>
            ))}
          </div>
          <div className="py-10 text-xl flex items-center gap-5">
            <button
              className="rounded-md text-white px-4 py-2 bg-gradient-to-r from-ctp-pink to-ctp-mauve hover:from-pink-600 hover:to-blue-600 transition-all hover:ease-in-out hover:duration-300"
              onClick={handlePrevClick}
            >
              Prev
            </button>
            <button
              className="rounded-md text-white px-4 py-2 bg-gradient-to-r from-ctp-green to-ctp-teal hover:from-secondary hover:to-primary transition-all hover:ease-in-out hover:duration-300"
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
