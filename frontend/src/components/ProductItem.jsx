import Table from "react-bootstrap/Table";

const ProductItem = ({ products }) => {
    return (
        <div className="mt-3">
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product name</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Operations</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product, index) => (
                        <tr key={product._id}>
                            <td>{ index + 1 }</td>
                            <td>{ product.productName }</td>
                            <td>{ product.category.categoryName }</td>
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
                                <i className="custom-font-awesome fa-solid fa-eye"></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ProductItem;
