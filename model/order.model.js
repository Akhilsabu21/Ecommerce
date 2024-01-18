import mongoose from "mongoose";


const orderSchema = mongoose.Schema({
    userId: {
        type:String,
    },
    orderItems: [
        {
            productid: { type: String },
            qty: { type: Number },
            image: { type: String },
            price: { type: Number },
            categoryName: { type: String },
            productName:{ type: String }
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

export default mongoose.model.orderitems || mongoose.model('orderitem', orderSchema)