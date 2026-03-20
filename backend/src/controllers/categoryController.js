import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Error server when call getCategories" });
    }
};
