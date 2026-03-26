import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import CustomPagination from "../components/CustomPagination";
import ProductItem from "../components/ProductItem";
import ProductTotal from "../components/ProductTotal";
import Search from "../components/Search";
import ModalAddProduct from "../components/ModalAddProduct";
import { api } from "../lib/axios";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [showModalAddProduct, setShowModalAddProduct] = useState(false);

    const getProducts = async () => {
        try {
            const res = await api.get(
                `/products?search=${search}&page=${page}`,
            );
            setProducts(res.data.products);
            setTotalPages(res.data.pagination.totalPages);
            setPage(res.data.pagination.page);
        } catch (error) {
            console.log(error);
            toast.error("Error server when call getProducts");
        }
    };

    const handleFetchProducts = () => {
        getProducts();
    };

    const handleClickPage = (page) => {
        setPage(page);
    };

    const handlePrevPage = (e) => {
        e.preventDefault();
        if(page <= 1) return;
        setPage(page - 1);
    };

    const handleNextPage = (e) => {
        e.preventDefault();
        if(page >= totalPages) return;
        setPage(page + 1);
    };

    const handleSubmitSearch = (e, patern) => {
        e.preventDefault();
        setSearch(patern);
    };

    useEffect(() => {
        getProducts();
    }, [search, page]);

    return (
        <div className="container mt-5">
            <Header />

            <Search search={search} handleSubmitSearch={handleSubmitSearch} />

            <div
                className={`d-flex ${search ? "justify-content-between" : "justify-content-end"} align-items-center mt-4`}
            >
                <ProductTotal search={search} products={products} />
                <div className="product-add">
                    <span
                        onClick={() => setShowModalAddProduct(true)}
                        className="fs-3"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </span>
                </div>
            </div>

            <ProductItem products={products} handleFetchProducts={handleFetchProducts} />

            <CustomPagination
                totalPages={totalPages}
                currentPage={page}
                handleClickPage={handleClickPage}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
            />

            <ModalAddProduct
                showModalAddProduct={showModalAddProduct}
                setShowModalAddProduct={setShowModalAddProduct}
                handleFetchProducts={handleFetchProducts}
                setPage={setPage}
            />

            <Footer />
        </div>
    );
};

export default HomePage;
