import mongoose from "mongoose";


const categorySchema=mongoose.Schema({
    category:{type:String},
    categoryImage:{type:Object}
    // Skin Care
    // make-up
    // Hair care
    // Fragrances
    // Personal Care
})

export default mongoose.model.categories || mongoose.model('category', categorySchema)
