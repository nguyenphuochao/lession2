import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import ProductItem from "./components/ProductItem";
import ProductTotal from "./components/ProductTotal";
import Search from "./components/Search";
import ModalAddProduct from "./components/ModalAddProduct";

function App() {
    const [products, setProducts] = useState([]);
    const [showModalAddProduct, setShowAddProduct] = useState(false);
     const handleCloseModal = () => setShowAddProduct(false);

    const getProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/products');
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="container mt-5">
            <Header />

            <Search />

            <div className="d-flex justify-content-between align-items-center mt-4">
                <ProductTotal />
                <div className="product-add">
                   <span onClick={() => setShowAddProduct(true)} className="fs-3">+</span>
                </div>
            </div>

            <ProductItem products={products} />

            <Pagination />

            <ModalAddProduct showModalAddProduct={showModalAddProduct} handleCloseModal={handleCloseModal}/>
        </div>
    );
}

export default App;
