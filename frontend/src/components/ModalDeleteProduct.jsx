import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { api } from "../lib/axios";
import { toast } from "react-toastify";

const ModalDeleteProduct = ({ showModalDeleteProduct, handleCloseModal, productId, handleFetchProducts }) => {
    const handleDeleteProduct = async () => {
        try {
            await api.delete("/products/" + productId);
            toast.success("Đã xóa sản phẩm");
            handleCloseModal();
            handleFetchProducts();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Modal show={showModalDeleteProduct} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Bạn chắc xóa sản phẩm này chứ?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleCloseModal} variant="secondary">Close</Button>
                    <Button onClick={handleDeleteProduct} variant="danger">Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteProduct;
