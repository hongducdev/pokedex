import React from "react";

import "./scss/Search.scss";

const Search = ({
   searchValue,
   setSearchValue,
   handleSearch,
   handleDelete,
}) => {
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
            {searchValue && (
               <i
                  className="uil uil-times-circle icon-delete-search"
                  onClick={handleDelete}></i>
            )}
            <button className="search__btn">
               <i className="uil uil-search"></i>
            </button>
         </form>
      </div>
   );
};

export default Search;
