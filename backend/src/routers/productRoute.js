import { createProduct, getProducts } from "../controllers/productController.js";
import express from 'express'

const router = express.Router();

router.get('/', getProducts);

router.post('/', createProduct);

export default router;