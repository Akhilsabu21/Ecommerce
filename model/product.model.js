import mongoose from "mongoose";

const productSchema = mongoose.Schema({
        name: {
            type: String,
            require: [true, "productName is required"]
        },
        category: {
            type: String,
            require: [true, "productCategory is required"]
        },
        categoryName: {
            type: String,
            require: [true, "productCategoryName is required"]
        },
        originalPrice: {
            type: Number,
            min: [5, "Price must be above 5"],
            require: [true, "productOriginalPrice is required"]
        },
        sellingPrice: {
            type: Number,
            min: [5, "Price must be above 5"],
            require: [true, "productSellingPrice is required"]
        },
        rating: { type: String },
        description:{type:String,
            require: [true, "Description is required"]},
        stock:{type:Number,
            min: [1, "QTY must be above 0"],
            require: [true, "stock is required"]},
        thumbnile: {
            type: Array,
            require: [true, "productThumbnile is required"]
        },
        images: {type: Object}
// Name
// category
// Description
// Price
// Size
// Image
// Description
// Stock
})

export default mongoose.model.products || mongoose.model('product', productSchema);
