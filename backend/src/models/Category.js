import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        require: true,
        type: String,
        trim: true,
        maxLength: 255,
    },
})

const Category = mongoose.model("Category", categorySchema);
export default Category;