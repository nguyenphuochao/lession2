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
    const [product, setProduct] = useState([]);
    const fetchProduct = async () => {
        try {
            const res = await api.get("/products/" + productId);
            setProduct(res.data);
        } catch (error) {
            console.log("Error server call fetchProduct", error);
            toast.error("Error server call fetchProduct");
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <>
            <Modal show={showModalDetailProduct} onHide={handleCloseModal}>
                <form>
                    <Modal.Header closeButton>
                        <Modal.Title>Detail product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="inputProductName">
                                Product name
                            </Form.Label>
                            <div className="fw-bold">{product?.productName}</div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <div className="fw-bold">
                                {product?.category?.categoryName}
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                    </Modal.Body>
                </form>
            </Modal>
        </>
    );
};

export default ModalDetailProduct;
