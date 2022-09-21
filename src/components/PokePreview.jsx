import React, { useEffect, useState } from "react";

import apiConfig from "../api/apiConfig";

import pokedexApi from "../api/pokedexApi";

import "./scss/PokePreview.scss";

const PokePreview = ({ pokemon }) => {
    const [pokemonInfo, setPokemonInfo] = useState();

    useEffect(() => {
        const fetchPokemonInfo = async () => {
            try {
                const response = await pokedexApi.getDetailPokemon(pokemon.id);
                if (response) {
                    setPokemonInfo(response);
                }
            } catch (error) {
                console.log("Failed to fetch pokemon info: ", error);
            }
        };
        fetchPokemonInfo();
    }, [pokemon]);

    return (
        <>
            {pokemonInfo && (
                <div className="pokepreview__container">
                    <div className="pokepreview__card">
                        <div className="pokepreview__card__image">
                            <img
                                src={apiConfig.gifUrl(pokemonInfo.id)}
                                alt="bulbasaur"
                            />
                        </div>
                        <div className="pokepreview__card__info">
                            <p className="pokepreview__card__id">
                                N°{pokemonInfo.id}
                            </p>
                            <h2 className="pokepreview__card__title">
                                {pokemonInfo.name.toUpperCase()}
                            </h2>
                            <div className="pokepreview__card__type">
                                {pokemonInfo.types.map((type) => (
                                    <span
                                        key={type.type.name}
                                        className={`type type-${type.type.name}`}>
                                        {type.type.name}
                                    </span>
                                ))}
                            </div>
                            <div className="pokepreview__card__height-weight">
                                <div className="pokepreview__card__height">
                                    <p className="pokepreview__card__height-title">
                                        Height
                                    </p>
                                    <p className="pokepreview__card__height-value bg__property">
                                        {pokemonInfo.height / 10} m
                                    </p>
                                </div>
                                <div className="pokepreview__card__weight">
                                    <p className="pokepreview__card__weight-title">
                                        Weight
                                    </p>
                                    <p className="pokepreview__card__weight-value bg__property">
                                        {pokemonInfo.weight / 10} kg
                                    </p>
                                </div>
                            </div>
                            <p className="pokepreview__card__text--bold">
                                Abilities:
                            </p>
                            {pokemonInfo.abilities.map((ability) => (
                                <span
                                    key={ability.ability.name}
                                    className="pokepreview__card__text--ability bg__property">
                                    {ability.ability.name}
                                </span>
                            ))}

                            <p className="pokepreview__card__text--bold">
                                Stats:
                            </p>
                            <div className="pokepreview__card__stat__list">
                                <div className="pokepreview__card__stat__item">
                                    <span className="stat__item hp">HP</span>
                                    <span className="stat__item hp__value">
                                        {pokemonInfo.stats[0].base_stat}
                                    </span>
                                </div>
                                <div className="pokepreview__card__stat__item">
                                    <span className="stat__item attack">
                                        ATK
                                    </span>
                                    <span className="stat__item attack__value">
                                        {pokemonInfo.stats[1].base_stat}
                                    </span>
                                </div>
                                <div className="pokepreview__card__stat__item">
                                    <span className="stat__item defense">
                                        DEF
                                    </span>
                                    <span className="stat__item defense__value">
                                        {pokemonInfo.stats[2].base_stat}
                                    </span>
                                </div>
                                <div className="pokepreview__card__stat__item">
                                    <span className="stat__item sp__attack">
                                        SpA
                                    </span>
                                    <span className="stat__item sp__attack__value">
                                        {pokemonInfo.stats[3].base_stat}
                                    </span>
                                </div>
                                <div className="pokepreview__card__stat__item">
                                    <span className="stat__item sp__defense">
                                        SpD
                                    </span>
                                    <span className="stat__item sp__defense__value">
                                        {pokemonInfo.stats[4].base_stat}
                                    </span>
                                </div>
                                <div className="pokepreview__card__stat__item">
                                    <span className="stat__item speed">
                                        SPD
                                    </span>
                                    <span className="stat__item speed__value">
                                        {pokemonInfo.stats[5].base_stat}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PokePreview;
