import Product from '../models/Product.js'

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        console.log("Error server when call getProducts", error);
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, categoryName, image } = req.body;
        if(!name || !categoryName) {
            return res.status(400).json({ message: "Vui lòng nhập name, categoryName" });
        }

        const product = await Product.create({
            name,
            categoryName,
            image
        });

        return res.status(201).json(product);
    } catch (error) {
        console.log("Error server when call createProduct", error);
    }
}

