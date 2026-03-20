import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName: {
            require: true,
            type: String,
            trim: true,
            maxLength: 255,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        productImage: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
