import axios from "axios";
import React, { useEffect, useState } from "react";

import pokedexApi from "../api/pokedexApi";

import PokeCard from "./PokeCard";
import PokePreview from "./PokePreview";

import "./scss/PokeList.scss";

const PokeList = ({ searchValue }) => {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    const [pokeDex, setPokeDex] = useState();

    // filter pokemons by name
    const filteredPokemons = pokemons.filter((searchValue) => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
            .then((res) => {
                // kiểm tra searchValue có trong tên pokemon hay không
                if (res.data.results.name.includes(searchValue)) {
                    setPokemons(res.data.results);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await pokedexApi.getPokedex(offset, limit);
                const { results } = response;
                const newPokemons = results.map((pokemon, index) => ({
                    ...pokemon,
                    id: index + offset + 1,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                        index + offset + 1
                    }.png`,
                }));
                setPokemons(newPokemons);
            } catch (error) {
                console.log("Failed to fetch pokemons: ", error);
            }
        };
        fetchPokemons();
    }, [offset, limit]);

    const handleNextPage = () => {
        setOffset(offset + limit);
    };

    const handlePrevPage = () => {
        setOffset(offset - limit);
    };

    return (
        <div className="pokelist__container">
            {searchValue ? (
                <div className="pokelist__content">
                    <div className="pokelist__grid">
                        <PokeCard
                            key={pokeDex?.id}
                            item={pokeDex}
                            infoPokemon={(poke) => setPokeDex(poke)}
                        />
                    </div>
                </div>
            ) : (
                <div className="pokelist__content">
                    <div className="pokelist__grid">
                        {pokemons.map((pokemon) => (
                            <PokeCard
                                key={pokemon.id}
                                item={pokemon}
                                infoPokemon={(poke) => setPokeDex(poke)}
                            />
                        ))}
                    </div>
                    <div className="pokelist__pagination">
                        <button
                            className="pokelist__btn"
                            onClick={handlePrevPage}>
                            <i className="uil uil-angle-left"></i>
                        </button>
                        <button
                            className="pokelist__btn"
                            onClick={handleNextPage}>
                            <i className="uil uil-angle-right"></i>
                        </button>
                    </div>
                </div>
            )}
            <div className="pokelist__preview">
                <PokePreview pokemon={pokeDex} />
            </div>
        </div>
    );
};

export default PokeList;
