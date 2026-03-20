import React, { useState } from "react";
import ModalDetailProduct from "./ModalDetailProduct";

const ProductCard = ({ product, index }) => {
    const [showModalDetailProduct, setShowDetailProduct] = useState(false);

    const handleCloseModal =  () => {
        setShowDetailProduct(false)
    }

    return (
        <>
            <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td>{product.category.categoryName}</td>
                <td>
                    <img
                        src="https://cdn.tgdd.vn/Products/Images/42/319665/samsung-galaxy-s24-256gb-5g-thumb-600x600.jpg"
                        width="50"
                        alt=""
                    />
                </td>
                <td>
                    <i className="custom-font-awesome fa-solid fa-pen-to-square"></i>
                    <i className="custom-font-awesome fa-solid fa-circle-minus"></i>
                    <i className="custom-font-awesome fa-regular fa-clipboard"></i>
                    <i onClick={() => setShowDetailProduct(true)} className="custom-font-awesome fa-solid fa-eye"></i>
                </td>
            </tr>

            <ModalDetailProduct showModalDetailProduct={showModalDetailProduct} handleCloseModal={handleCloseModal} productId={product._id} />
        </>
    );
};

export default ProductCard;
