import React, { useState } from "react";

import "./scss/Search.scss";

const Search = ({ searchValue, setSearchValue, handleSearch }) => {
    // const handleSearchInputChanges = (e) => {
    //     setSearchValue(e.target.value);
    // };

    // return (
    //     <div className="search__container">
    //         <form>
    //             <input
    //                 value={searchValue}
    //                 onChange={handleSearchInputChanges}
    //                 type="text"
    //                 placeholder="Search for a pokemon"
    //                 className="search__input"
    //             />
    //             <button className="search__btn">
    //                 <i className="uil uil-search"></i>
    //             </button>
    //         </form>
    //     </div>
    // );

    return (
        <div className="search__container">
            <form onSubmit={handleSearch}>
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                    placeholder="Search for a pokemon"
                    className="search__input"
                />
                <button className="search__btn">
                    <i className="uil uil-search"></i>
                </button>
            </form>
        </div>
    );
};

export default Search;
