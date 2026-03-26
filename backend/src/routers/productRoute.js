import {
    copyProduct,
    createProduct,
    deleteProduct,
    detailProduct,
    getProducts,
    updateProduct,
    uploadProduct,
} from "../controllers/productController.js";
import express from "express";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", detailProduct);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.post("/:id/upload", upload.single("file"), uploadProduct);

router.post("/:id/copy", copyProduct);

export default router;
