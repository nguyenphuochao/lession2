import React from "react";

const ProductTotal = ({ search, products }) => {

    if(!search) {
        return;
    }

    return (
        <div>
            Search found <span className="fw-bold">{products.length}</span> results
        </div>
    );
};

export default ProductTotal;
