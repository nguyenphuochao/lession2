import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            require: true,
            type: String,
            trim: true,
            maxLength: 255,
        },
        categoryName: {
            require: true,
            type: String,
            trim: true,
            maxLength: 255,
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

const Product = mongoose.model("Product", productSchema);
export default Product;