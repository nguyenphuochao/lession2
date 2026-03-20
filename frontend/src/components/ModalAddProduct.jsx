import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from "axios";
import { api } from "../lib/axios";

const ModalAddProduct = ({ showModalAddProduct, handleCloseModal, handleFetchProducts, setPage }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await api.post("/products", data);
            toast.success(`Đã thêm mới sản phẩm ${data.name}`)
            handleCloseModal();
            reset();
            handleFetchProducts();
            setPage(1);
        } catch (error) {
            console.log(error);
            toast.error("Có lỗi xảy ra", error)
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
                                {...register("name", { required: true })}
                                type="text"
                                id="inputProductName"
                            />
                            {errors.name && (
                                <p className="text-danger">Name is required.</p>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                {...register("categoryId", { required: true })}
                            >
                                <option value="">Please select menu</option>
                                <option value="1">Samsung</option>
                                <option value="2">Nokia</option>
                                <option value="3">OPPO</option>
                                <option value="3">Iphone</option>
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
