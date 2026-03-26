import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../lib/axios";
import { useEffect, useRef, useState } from "react";

const ModalAddProduct = ({
    showModalAddProduct,
    setShowModalAddProduct,
    handleFetchProducts,
    setPage,
}) => {
    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const inputRef = useRef();
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
            toast.error("Error server call fetchCategories");
        }
    };

    useEffect(() => {
        if (showModalAddProduct) {
            fetchCategories();
        }
    }, [showModalAddProduct]);

    const onSubmit = async (data) => {
        try {
            // create new product
            const productResponse = await api.post("/products", data);
            // use formData handle upload file
            const formData = new FormData();
            formData.append("file", file);
            await api.post(
                `/products/${productResponse.data._id}/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );

            // OK
            toast.success(`Đã thêm mới sản phẩm ${data.productName}`);
            handleCloseModal();
            resetForm();
            handleFetchProducts();
        } catch (error) {
            console.log(error);
            toast.error("Error server when call createProduct", error);
        }
    };

    const handleChangeImage = (e) => {
        setFile(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleRemoveImage = () => {
        setFile(null);
        setPreviewImage(null);
        inputRef.current.value = "";
    };

    const handleCloseModal = () => {
        setShowModalAddProduct(false);
        resetForm();
    }

    const resetForm = () => {
        reset();
        handleRemoveImage();
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
                                {categories.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.categoryName}
                                    </option>
                                ))}
                            </Form.Select>
                            {errors.categoryId && (
                                <p className="text-danger">
                                    Category is required.
                                </p>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                ref={inputRef}
                                onChange={handleChangeImage}
                                type="file"
                            />
                            {previewImage && (
                                <div className="d-flex align-items-center gap-3">
                                    <img
                                        className="mt-2"
                                        src={previewImage}
                                        alt="preview image"
                                        width={100}
                                    />
                                    <button onClick={handleRemoveImage}>
                                        X
                                    </button>
                                </div>
                            )}
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
