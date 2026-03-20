import { createProduct, detailProduct, getProducts } from "../controllers/productController.js";
import express from 'express'

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', detailProduct);

router.post('/', createProduct);

export default router;