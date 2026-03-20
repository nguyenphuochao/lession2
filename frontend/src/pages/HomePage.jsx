import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../components/Header";
import CustomPagination from "../components/CustomPagination";
import ProductItem from "../components/ProductItem";
import ProductTotal from "../components/ProductTotal";
import Search from "../components/Search";
import ModalAddProduct from "../components/ModalAddProduct";
import { api } from "../lib/axios";
import { toast } from "react-toastify";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [showModalAddProduct, setShowAddProduct] = useState(false);
    const handleCloseModal = () => setShowAddProduct(false);

    const getProducts = async () => {
        try {
            const res = await api.get(`/products?search=${search}&page=${page}`);
            setProducts(res.data.products);
            setTotalPages(res.data.pagination.totalPages);
            setPage(res.data.pagination.page);
        } catch (error) {
            console.log(error);
            toast.error("Error server when call getProducts")
        }
    };

    const handleFetchProducts = () => {
        getProducts();
    }

    const handleClickPage = (page) => {
        setPage(page);
    }

    useEffect(() => {
        getProducts();
    }, [page]);

    return (
        <div className="container mt-5">
            <Header />

            <Search search={search} setSearch={setSearch} handleFetchProducts={handleFetchProducts}/>

            <div className="d-flex justify-content-between align-items-center mt-4">
                <ProductTotal />
                <div className="product-add">
                    <span
                        onClick={() => setShowAddProduct(true)}
                        className="fs-3"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </span>
                </div>
            </div>

            <ProductItem products={products} />

            <CustomPagination totalPages={totalPages} currentPage={page} handleClickPage={handleClickPage}/>

            <ModalAddProduct
                showModalAddProduct={showModalAddProduct}
                handleCloseModal={handleCloseModal}
                handleFetchProducts={handleFetchProducts}
                setPage={setPage}
            />
        </div>
    );
};

export default HomePage;
