import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { api } from "../lib/axios";
import { useEffect, useState } from "react";

const ModalAddProduct = ({ showModalAddProduct, handleCloseModal, handleFetchProducts, setPage }) => {
    const [categories, setCategories] = useState([]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const fetchCategories = async () => {
        try {
            const res = await api.get("/categories");
            setCategories(res.data);
        } catch (error) {
            console.log("Error server call fetchCategories", error);
            toast.error("Error server call fetchCategories")
        }
    }

    useEffect(() => {
        if(showModalAddProduct) {
            fetchCategories();
        }
    }, [showModalAddProduct]);

    const onSubmit = async (data) => {
        try {
            await api.post("/products", data);
            toast.success(`Đã thêm mới sản phẩm ${data.productName}`)
            handleCloseModal();
            reset();
            handleFetchProducts();
            setPage(1);
        } catch (error) {
            console.log(error);
            toast.error("Error server when call createProduct", error)
        }
    };

    return (
        <>
            <Modal show={showModalAddProduct} onHide={handleCloseModal}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="inputProductName">
                                Product name
                            </Form.Label>
                            <Form.Control
                                {...register("productName", { required: true })}
                                type="text"
                                id="inputProductName"
                            />
                            {errors.productName && (
                                <p className="text-danger">Name is required.</p>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                {...register("categoryId", { required: true })}
                            >
                                <option value="">Please select menu</option>
                                {
                                    categories.map((category) => (
                                        <option key={category._id} value={category._id}>{category.categoryName}</option>
                                    ))
                                }
                            </Form.Select>
                            {errors.categoryId && (
                                <p className="text-danger">
                                    Category is required.
                                </p>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer className="justify-content-start">
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default ModalAddProduct;
