import React, { useState } from "react";
import ModalDetailProduct from "./ModalDetailProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";

const ProductCard = ({ product, index, handleFetchProducts }) => {
    const [showModalDetailProduct, setShowDetailProduct] = useState(false);
    const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);

    const handleCloseModal = () => {
        setShowDetailProduct(false);
        setShowModalDeleteProduct(false);
    };

    return (
        <>
            <tr>
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td>{product.category.categoryName}</td>
                <td>
                    {product.productImage ? (
                        <img src={product.productImage} width="50" alt="" />
                    ) : (
                        <img src="/noimage.jpg" width="50" alt="" />
                    )}
                </td>
                <td>
                    <i className="custom-font-awesome fa-solid fa-pen-to-square"></i>
                    <i
                        onClick={() => setShowModalDeleteProduct(true)}
                        className="custom-font-awesome fa-solid fa-circle-minus"
                    ></i>
                    <i className="custom-font-awesome fa-regular fa-clipboard"></i>
                    <i
                        onClick={() => setShowDetailProduct(true)}
                        className="custom-font-awesome fa-solid fa-eye"
                    ></i>
                </td>
            </tr>

            <ModalDetailProduct
                showModalDetailProduct={showModalDetailProduct}
                handleCloseModal={handleCloseModal}
                productId={product._id}
            />

            <ModalDeleteProduct
                showModalDeleteProduct={showModalDeleteProduct}
                handleCloseModal={handleCloseModal}
                productId={product._id}
                handleFetchProducts={handleFetchProducts}
            />
        </>
    );
};

export default ProductCard;
