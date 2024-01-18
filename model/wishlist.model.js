import mongoose from "mongoose";


const favSchema = mongoose.Schema({
    userId: {
        type:String,
        required: [true,'user id required']
    },
    favorite: [
        {
            productid: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            categoryName: { type: String, required: true },
            productName:{ type: String, required: true }
        },
    ]
})

export default mongoose.model.favitems || mongoose.model('favitem', favSchema)