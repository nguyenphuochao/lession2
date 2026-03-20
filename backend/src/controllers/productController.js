import Product from "../models/Product.js";
import { formattedProduct } from "../utils/productHelper.js";

export const getProducts = async (req, res) => {
    try {
        let query;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) | 10;
        const offset = (page - 1) * limit;
        const searchTerm = req.query.search;

        // search by name or categoryName
        if (searchTerm) {
            query = {
                $or: [
                    { productName: new RegExp(searchTerm, "i") },
                    { categoryName: new RegExp(searchTerm, "i") },
                ],
            };
        }

        const [products, total] = await Promise.all([
            Product.find(query)
                .sort({ createdAt: -1 })
                .populate("categoryId", "categoryName")
                .skip(offset)
                .limit(limit)
                .exec(),
            Product.countDocuments(query),
        ]);

        const totalPages = Math.ceil(total / limit);

        const formatted = products.map((product) => formattedProduct(product));

        return res.status(200).json({
            products: formatted,
            pagination: {
                page,
                totalPages,
            },
        });
    } catch (error) {
        console.log("Error server when call getProducts", error);
    }
};

export const createProduct = async (req, res) => {
    try {
        const { productName, categoryId, productImage } = req.body;
        if (!productName || !categoryId) {
            return res
                .status(400)
                .json({ message: "Please enter productName, categoryId" });
        }

        const product = await Product.create({
            productName,
            categoryId,
            productImage,
        });

        return res.status(201).json(product);
    } catch (error) {
        console.log("Error server when call createProduct", error);
    }
};

export const detailProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).populate(
            "categoryId",
            "categoryName",
        );

        if (!product) {
            return res
                .status(404)
                .json({ message: `Product not found ID=${productId}` });
        }

        return res.status(200).json(formattedProduct(product));
    } catch (error) {
        console.log("Error server when call detailProduct", error);
        return res.status(500).json({ message: "Error server" });
    }
};
