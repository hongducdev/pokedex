import React, { useEffect, useState } from "react";
import pokedexApi from "../api/pokedexApi";
import PokeCard from "./PokeCard";
import PokePreview from "./PokePreview";
import "./scss/PokeList.scss";

const PokeList = ({ searchData }) => {
   const [offset, setOffset] = useState(0);
   const [limit, setLimit] = useState(20);
   const [detailPokemon, setDetailPokemon] = useState({});

   // nếu searchDate là " " thì sẽ hiển thị ra 20 pokemon đầu tiên
   // nếu searchDate khác " " thì sẽ hiển thị ra pokemon tương ứng với searchDate

   useEffect(() => {
      const fetchPokemons = async () => {
         try {
            const response = await pokedexApi.getPokedex(offset, limit);

            const { results } = response;

            if (results) {
               const newResults = results.map(async (result) => {
                  const response = await pokedexApi.getPokeByName(result.name);
                  return response;
               });

               const pokemons = await Promise.all(newResults);
               setDetailPokemon(pokemons);
            }
         } catch (error) {
            console.log("Failed to fetch pokemons: ", error);
         }
      };
      fetchPokemons();
   }, [offset, limit]);

   useEffect(() => {
      if (searchData === " " || searchData === undefined) {
         return;
      }
      const fetchSearchPokemon = async () => {
         try {
            const response = await pokedexApi.getPokeByName(searchData);

            setDetailPokemon(response);
         } catch (error) {
            console.log("Failed to fetch search pokemon: ", error);
         }
      };
      fetchSearchPokemon();
   }, [searchData]);

   const handleNext = () => {
      setOffset(offset + 20);
   };

   const handlePrev = () => {
      setOffset(offset - 20);
   };

   // khi chọn pokemon thì hiển thị ra preview
   const [pokemon, setPokemon] = useState({});
   const handleSelectPokemon = (pokemon) => {
      setPokemon(pokemon);
   };

   return (
      <div className="pokelist">
         <div className="pokelist__container">
            {/* nếu không tìm thấy pokemon thì hiển thị thông báo */}
            {searchData && !detailPokemon.name ? (
               <div className="pokelist__notfound">
                  <h2>Not found</h2>
               </div>
            ) : (
               <div className="pokelist__grid">
                  {Array.isArray(detailPokemon) ? (
                     detailPokemon.map((pokemon) => (
                        <PokeCard
                           key={pokemon.id}
                           pokemon={pokemon}
                           onSelectPokemon={handleSelectPokemon}
                        />
                     ))
                  ) : (
                     <PokeCard
                        key={detailPokemon.id}
                        pokemon={detailPokemon}
                        onSelectPokemon={handleSelectPokemon}
                     />
                  )}
               </div>
            )}
            <div className="pokelist__container__preview">
               <PokePreview pokemon={pokemon} />
            </div>
         </div>
         <div className="pokelist__pagination">
            {!searchData && (
               <>
                  <button
                     className="pokelist__btn"
                     onClick={handlePrev}
                     disabled={offset === 0}>
                     Prev
                  </button>
                  <button className="pokelist__btn" onClick={handleNext}>
                     Next
                  </button>
               </>
            )}
         </div>
      </div>
   );
};

export default PokeList;
