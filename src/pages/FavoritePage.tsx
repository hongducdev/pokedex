import { useEffect, useState } from "react";
import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading";

const FavoritePage = () => {
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchFavoritePokemon = () => {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        const favorites: string[] = JSON.parse(storedFavorites);
        setPokemonList(favorites);
        setLoading(false);
        setError(false);
      } else {
        setPokemonList([]);
        setLoading(false);
        setError(false);
      }
    };

    fetchFavoritePokemon();
  }, []);

  return (
    <div className="relative max-w-screen min-h-screen">
      <Header />
      <div className="w-full px-10">
        <div className="text-center py-[50px]">
          <span className="text-transparent bg-gradient-to-r from-ctp-blue to-ctp-pink text-7xl font-bold bg-clip-text capitalize">
            Your Favorite Pokemon
          </span>
        </div>
      </div>
      {loading && (
        <div className="text-center">
          <Loading />
        </div>
      )}
      {error && <div className="text-center">Error...</div>}
      {!loading && !error && (
        <div className="w-full px-10">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {pokemonList.length > 0 ? (
              pokemonList.map((pokemon: string) => (
                <PokemonCard name={pokemon} key={pokemon} />
              ))
            ) : (
              <div className="text-center">No favorite pokemon</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
