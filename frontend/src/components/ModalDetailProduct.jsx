import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../lib/axios";
import { useEffect, useState } from "react";

const ModalDetailProduct = ({
    showModalDetailProduct,
    handleCloseModal,
    productId,
}) => {
    const [loading, setLoading] = useState(false);
    console.log(productId);
    const [product, setProduct] = useState([]);
    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await api.get("/products/" + productId);
            setProduct(res.data);
        } catch (error) {
            console.log("Error server call fetchProduct", error);
            toast.error("Error server call fetchProduct");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    return (
        <>
            <Modal show={showModalDetailProduct} onHide={handleCloseModal}>
                <form>
                    <Modal.Header closeButton>
                        <Modal.Title>Detail product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="inputProductName">
                                        Product name
                                    </Form.Label>
                                    <div className="fw-bold">
                                        {product?.productName}
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <div className="fw-bold">
                                        {product?.category?.categoryName}
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    {product?.productImage ? (
                                        <img
                                            src={product?.productImage}
                                            width="200"
                                            alt=""
                                        />
                                    ) : (
                                        <img
                                            src="/noimage.jpg"
                                            width="200"
                                            alt=""
                                        />
                                    )}
                                </Form.Group>
                            </div>
                        )}
                    </Modal.Body>
                </form>
            </Modal>
        </>
    );
};

export default ModalDetailProduct;
