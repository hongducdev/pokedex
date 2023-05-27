/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { getPokemonByName } from "../api/pokemonServices";
import apiConfig from "../api/apiConfig";
import StatTag from "../components/StatTag";
import EvolutionCard from "../components/EvolutionCard";
import TypeTag from "../components/TypeTag";
import Loading from "../components/Loading";
import TextHeading from "../components/TextHeading";

interface Pokemon {
  id: number | undefined;
  name: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  sprites: {
    back_default: string | null | undefined;
    back_shiny: string | null | undefined;
    front_default: string | null | undefined;
    front_shiny: string | null | undefined;
  };
}

const PokemonPage = () => {
  const { name } = useParams<{ name?: string }>();

  const [pokemon, setPokemon] = React.useState<Pokemon>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);
  const [, setIsFavorite] = React.useState<boolean>(false);

  // Check if pokemon is in favorites
  React.useEffect(() => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      const favoritesArr = JSON.parse(favorites);
      if (name) {
        if (favoritesArr.includes(name)) {
          setIsFavorite(true);
        }
      }
    }
  }, [name]);

  React.useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        if (name) {
          const response = await getPokemonByName(name);
          setPokemon(response.data);
        }
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  const handleAddToFavorites = () => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      const favoritesArr: string[] = JSON.parse(favorites);
      if (name) {
        if (favoritesArr.includes(name)) {
          // Remove pokemon from favorites
          const updatedFavorites = favoritesArr.filter(
            (fav: string) => fav !== name
          );
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          setIsFavorite(false);
        } else {
          // Add pokemon to favorites
          favoritesArr.push(name);
          localStorage.setItem("favorites", JSON.stringify(favoritesArr));
          setIsFavorite(true);
        }
      }
    } else {
      if (name) {
        // Add pokemon to favorites
        localStorage.setItem("favorites", JSON.stringify([name]));
        setIsFavorite(true);
      }
    }
  };

  return (
    <div className="relative max-w-screen min-h-screen">
      <Header />
      {loading && (
        <div className="text-center">
          <Loading />
        </div>
      )}
      {error && <div className="text-center">Error...</div>}
      {!loading && !error && (
        <div className="w-full px-3">
          <div className=" text-center pt-[100px] pb-[30px] md:py-[50px]">
            <TextHeading text={pokemon?.name} />
          </div>
          <div className="flex items-center justify-center gap-10 flex-col md:flex-row">
            <div className="bg-gradient-to-b from-ctp-mantle to-ctp-crust flex flex-col items-center p-5 rounded-3xl">
              <div className="">
                {pokemon && pokemon.id && (
                  <img
                    src={apiConfig.gifUrl(pokemon.id)}
                    alt={pokemon.name}
                    className="h-[300px]"
                  />
                )}
              </div>
              <div className="">
                <div className="flex items-center gap-4 mt-4">
                  {pokemon?.types.map((type) => (
                    <TypeTag key={type.type.name} type={type.type.name} />
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-4">
                  {pokemon?.stats.map((stat) => (
                    <StatTag
                      key={stat.stat.name}
                      stat_name={stat.stat.name}
                      base_stat={stat.base_stat}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-t md:bg-gradient-to-b from-ctp-mantle to-ctp-crust flex flex-col items-center p-10 md:p-5 rounded-3xl">
              <div className="">
                {/* evolution */}
                {pokemon?.id && <EvolutionCard id={pokemon.id} />}
              </div>
              <div className="mt-7">
                {/* sprites */}
                {pokemon?.sprites.back_default &&
                  pokemon.sprites.back_shiny &&
                  pokemon.sprites.front_default &&
                  pokemon.sprites.front_shiny && (
                    <div className="flex items-center gap-0 md:gap-4 mt-4 flex-col md:flex-row">
                      <img
                        src={pokemon?.sprites.back_default}
                        alt={pokemon?.name}
                        className="h-[300px]"
                      />
                      <img
                        src={pokemon?.sprites.back_shiny}
                        alt={pokemon?.name}
                        className="h-[300px]"
                      />
                      <img
                        src={pokemon?.sprites.front_default}
                        alt={pokemon?.name}
                        className="h-[300px]"
                      />
                      <img
                        src={pokemon?.sprites.front_shiny}
                        alt={pokemon?.name}
                        className="h-[300px]"
                      />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}

      <>
        {localStorage.getItem("favorites")?.includes(name || "") ? (
          <div
            className="bg-gradient-to-r from-ctp-pink to-ctp-mauve px-4 py-2 text-xl rounded-xl dark:text-white text-black fixed right-5 bottom-5 hover:-translate-y-2 transition-all ease-in-out duration-300 cursor-pointer"
            onClick={handleAddToFavorites}
          >
            Remove from favorites 🌟
          </div>
        ) : (
          <div
            className="bg-gradient-to-r from-ctp-pink to-ctp-mauve px-4 py-2 text-xl rounded-xl dark:text-white text-black fixed right-5 bottom-5 hover:-translate-y-2 transition-all ease-in-out duration-300 cursor-pointer"
            onClick={handleAddToFavorites}
          >
            Add to favorites 🌟
          </div>
        )}
      </>
    </div>
  );
};

export default PokemonPage;
