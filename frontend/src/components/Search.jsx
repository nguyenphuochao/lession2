import React from "react";

const Search = ({ search, setSearch, handleFetchProducts }) => {

    const handleKeyPress= (e) => {
        if(e.key === "Enter") {
            handleFetchProducts();
        }
    }

    return (
        <div className="mt-4">
            <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                placeholder="Search"
                className="w-100 border border-5"
                onKeyPress={handleKeyPress}
            />
        </div>
    );
};

export default Search;
