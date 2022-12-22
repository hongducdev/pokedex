import React from "react";
import "./scss/PokeCard.scss";

const PokeCard = ({ pokemon, onSelectPokemon }) => {
   return (
      <div className="pokelist__card" onClick={() => onSelectPokemon(pokemon)}>
         <div className="pokelist__card-img">
            <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
         </div>
         <div className="pokelist__card-info">
            <p className="pokelist__card-id">N°{pokemon.id}</p>
            <h3 className="pokelist__card-name">{pokemon.name}</h3>
            <div className="pokelist__card-type">
               {pokemon.types?.map((type) => (
                  <span
                     key={type.type.name}
                     className={`type type-${type.type.name}`}>
                     {type.type.name}
                  </span>
               ))}
            </div>
         </div>
      </div>
   );
};

export default PokeCard;
