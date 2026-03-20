import React, { useState } from "react";

const Search = ({ search, handleSubmitSearch }) => {

    const [patern, setPatern] = useState(search);

    return (
        <form onSubmit={(e) => handleSubmitSearch(e, patern)} className="mt-4">
            <input
                onChange={(e) => setPatern(e.target.value)}
                value={patern}
                type="text"
                placeholder="🔍︎Search"
                className="w-100 border border-5 p-2 search-input"
            />
        </form>
    );
};

export default Search;
