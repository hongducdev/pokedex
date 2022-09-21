import React, { useState } from "react";

import './scss/PokeCard.scss';

const axios = require("axios");

const PokeCard = ({ item, infoPokemon }) => {
    // lấy loại của pokemon
    const [type, setType] = React.useState([]);
    React.useEffect(() => {
        axios
            .get(item.url)
            .then((response) => {
                const { data } = response;
                const { types } = data;
                const newTypes = types.map((type) => type.type.name);
                setType(newTypes);
            })
            .catch((error) => {
                console.log("Failed to fetch pokemon type: ", error);
            });
    }, [item.url]);

    return (
        // hiển thị hình ảnh, tên, id, loại pokemon
        <div className="pokelist__card" onClick={() => infoPokemon(item)}>
            <div className="pokelist__card-img">
                <img src={item.image} alt={item.name} />
            </div>
            <div className="pokelist__card-info">
                <p className="pokelist__card-id">#{item.id}</p>
                <h3 className="pokelist__card-name">{item.name}</h3>
                <div className="pokelist__card-type">
                    {type.map((type) => (
                        <span key={type} className={`type type-${type}`}>
                            {type}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokeCard;
