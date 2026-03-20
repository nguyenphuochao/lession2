export const formattedProduct = (product) => {
    return {
        _id: product._id,
        productName: product.productName,
        category: {
            _id: product.categoryId._id,
            categoryName: product.categoryId.categoryName,
        },
        productImage: product.productImage,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
    };
};
