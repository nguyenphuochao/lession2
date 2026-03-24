import Table from "react-bootstrap/Table";
import ProductCard from "./ProductCard";

const ProductItem = ({ products, handleFetchProducts }) => {
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
                    {/* have products */}
                    {products.length > 0 &&
                        products.map((product, index) => (
                            <ProductCard product={product} index={index} handleFetchProducts={handleFetchProducts} />
                        ))}

                    {/* no data product */}
                    {products.length === 0 && (
                        <tr>
                            <td colSpan={5}>No data product</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default ProductItem;
