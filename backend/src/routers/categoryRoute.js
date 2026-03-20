import { getCategories } from "../controllers/categoryController.js";
import express from 'express'

const router = express.Router();

router.get('/', getCategories);

export default router;