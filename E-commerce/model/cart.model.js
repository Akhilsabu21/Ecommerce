import mongoose from "mongoose";


const cartSchema = mongoose.Schema({
    userId: {
        type:String,
        required: [true,'user id required']
    },
    orderItems: [
        {
            productid: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            categoryName: { type: String, required: true },
            productName:{ type: String, required: true }
        },
    ],
    shippingAddress: {
        name: { type: String },
        email: { type: String },
        address: { type: String },
        city: { type: String },
        postalCode: { type: String },
        phone: { type: String },
    }
})

export default mongoose.model.cartitems || mongoose.model('cartitem', cartSchema)