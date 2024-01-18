import adminSchema from './model/admin.model.js';
import bcrypt from 'bcrypt';
import pkg from 'jsonwebtoken';
import productSchema from './model/product.model.js';
import categorySchema from './model/category.model.js'
import userSchema from './model/user.model.js'
import cartSchema from './model/cart.model.js'
import orderSchema from './model/order.model.js'
import favSchema from './model/wishlist.model.js'
import path from "path";
import { log } from 'console';

const { sign } = pkg;

// admin
// export function addAdmin(req, res) {
//     try {
//         const { email, UserName, password, phone } = req.body;
//         bcrypt.hash(password, 10)
//             .then((hashedPWd) => {
//                 adminSchema.create({ email, UserName, password: hashedPWd, phone })
//             }).then(() => {
//                 res.status(200).send({ msg: `${UserName}` })
//             })
//     } catch (error) {
//         res.status(404).send(error)
//         console.log(error);
//     }
// }

export async function addAdmin(req, res) {
    try {
        const { email, UserName, password, phone } = req.body;
        const existingAdmin = await adminSchema.findOne({
            $or: [
              { 'UserName': UserName },
              { 'email': email },
              { 'phone': phone }
            ]
          });
          
          if (existingAdmin) {
            res.status(400).send({ error: 'UserName, email, or phone already exists' });
            return;
          }

        const hashedPWd = await bcrypt.hash(password, 10);
        
        await adminSchema.create({ email, UserName, password: hashedPWd, phone });
        
        res.status(200).send({ msg: `${UserName}` });
    } catch (error) {
        console.error(error);
        res.status(404).send(error);
    }
}

export async function adminLogin(req, res) {
    try {
        const { UserName, email, password } = req.body;
        const user = await adminSchema.findOne({ UserName });
        if (!user)
            return res.status(404).send({ msg: "User not found" })
        if (email !== user.email)
            return res.status(404).send({ msg: "email doesn't match" })
        const success = await bcrypt.compare(password, user.password);
        if (success !== true)
            return res.status(404).send({ msg: "password is incorrect" });
        const token = await sign({ UserName }, process.env.JWT_KEY, { expiresIn: '24h' });
        console.log(token);
        return res.status(200).send({ msg: "successfully loged in", token })
    } catch (error) {
        console.log(error);
    }
}
export async function forgotAdminUserName(req, res) {
    try {
        const { phone } = req.params;
        const data = await adminSchema.findOne({ phone: phone })
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
}
export async function foregotAdminPassword(req, res) {
    try {
        const { phone } = req.params;
        const { password } = req.body;
        const hashedPwd = await bcrypt.hash(password, 10);
        await adminSchema.updateOne({ phone: phone }, { $set: { password: hashedPwd } });
        res.status(201).send("updated");
    } catch (error) {
        console.log(error);
    }
}
export async function adminHome(req, res) {
    // console.log(req.user.UserName);
    try {
        const name = req.user.UserName;
        return res.status(200).send({ msg: name })
    } catch (error) {
        res.status(404).send(error)
    }
}

// admin


// category

export async function addCategories(req, res) {
    // console.log(req.file);
    // res.end()
    try {
        // console.log(req.body);
        const { ...categories } = req.body;
        const categoryImage = req.file;
        console.log(categories, categoryImage);
        res.status(200).send(categorySchema.create({ ...categories, categoryImage }))
    } catch (error) {
        console.log(error);
    }
}

export async function getCategory(req, res) {
    const data = await categorySchema.find();
    res.status(201).send(data)
}

export async function getSingleCategory(req, res) {
    const { id } = req.params;
    const data = await categorySchema.findOne({ _id: id })
    res.status(200).send(data)
}

export async function categoryEdit(req, res) {
    const { id } = req.params;
    const { ...categories } = req.body
    const categoryImage = req.file;
    await categorySchema.updateOne({ _id: id }, { $set: { ...categories, categoryImage } })
    res.status(201).send('Updated')
}

export async function deleteCategory(req, res) {
    const { id } = req.params;
    await categorySchema.deleteOne({ _id: id })
    res.status(201).send('Category removed')
}

export async function getCategoryFile(req, res) {
    let { filename } = req.params;
    return res.sendFile(path.resolve(`./Products/${filename}`))
}
// category

// products


export async function addProduct(req, res) {
    try {
        const { ...Products } = req.body;
        const { thumbnile, images } = req.files;
        res.status(201).send(productSchema.create({ ...Products, thumbnile, images }))
    } catch (error) {
        console.log(res);
    }
}

export async function getProducts(req, res) {
    const data = await productSchema.find();
    res.status(200).send(data);
}


export async function deleteProduct(req, res) {
    const { id } = req.params;
    console.log(id);
    try {
        await productSchema.deleteOne({ _id: id })
        res.status(201).send('Product Removed')
    } catch (error) {
        res.status(404).send({ msg: 'Product not removed', error })
    }
}

export async function singleProduct(req, res) {
    try {
        const { id } = req.params;
        const data = await productSchema.findOne({ _id: id });
        res.status(201).send(data)
    } catch (error) {
        res.status(404).send(error)
    }
}

export async function editProduct(req,res)
{
    console.log(req.body);
    try {
    const { id } = req.params;
    const { ...Products } = req.body;
    const { thumbnile, images } = req.files;
    await productSchema.updateOne({ _id: id }, { $set: { ...Products, thumbnile, images} })
    res.status(201).send('Updated')
    } catch (error) {
        res.status(404).send(error)
    }
}

// products

// user

export async function addUser(req, res) {
    // console.losg(req.body);
    try {
        const { email, UserName, password, phone } = req.body;
        console.log(email, UserName, password, phone);
        const existingAdmin = await adminSchema.findOne({
            $or: [
              { 'UserName': UserName },
              { 'email': email },
              { 'phone': phone }
            ]
          });
          
          if (existingAdmin) {
            res.status(400).send({ error: 'UserName, email, or phone already exists' });
            return;
          }
          const hashedPWd = await bcrypt.hash(password, 10);
        
        await userSchema.create({ email, UserName, password: hashedPWd, phone });
        
        res.status(200).send({ msg: `${UserName}` });
    } catch (error) {
        console.error(error);
        res.status(404).send(error);
    }
    
}
export async function userLogin(req, res) {
    try {
        const { UserName, email, password } = req.body;
        const user = await userSchema.findOne({ UserName });
        if (!user)
            return res.status(404).send({ msg: "User not found" })
        if (email !== user.email)
            return res.status(404).send({ msg: "email doesn't match" })
        const success = await bcrypt.compare(password, user.password);
        if (success !== true)
            return res.status(404).send({ msg: "password is incorrect" });
        const token = await sign({ UserName }, process.env.JWT_KEY, { expiresIn: '24h' });
        console.log(token);
        return res.status(200).send({ msg: "successfully loged in", token })
    } catch (error) {
        console.log(error);
    }
}
export async function forgotUserName(req, res) {
    try {
        const { phone } = req.params;
        const data = await userSchema.findOne({ phone: phone })
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
}
export async function foregotUserPassword(req, res) {
    try {
        const { phone } = req.params;
        const { password } = req.body;
        const hashedPwd = await bcrypt.hash(password, 10);
        await userSchema.updateOne({ phone: phone }, { $set: { password: hashedPwd } });
        res.status(201).send("updated");
    } catch (error) {
        console.log(error);
    }
}
export async function userHome(req, res) {
    // console.log(req.user.UserName);
    try {
        const name = req.user.UserName;
        // console.log(name);
        if(!name) return res.status(404).send('time out')
        const id=await userSchema.findOne({UserName : name})
    // console.log(id._id);
        return res.status(200).send({ msg: name , userid : id._id})
    } catch (error) {
        res.status(404).send(error)
    }
}

export async function addToCart(req,res)
{
    try {
        const {...cartitems}=req.body;
        const {id}=req.params;
        const {...arr}=cartitems.orderItems[0]
        // console.log('id=',id,cartitems);
        const cart= await cartSchema.findOne({userId : id});
        console.log(cart);
        if(!cart){
            console.log(cartitems,'id',id);
            const newCart = await cartSchema.create({ ...cartitems });
            console.log(newCart);
            res.status(201).send(newCart);
        }
        else{
            console.log(arr);
            const data =await cartSchema.findOneAndUpdate({'userId' : id} ,{ $push : {'orderItems':{...arr}}})
            console.log('data',data);
            res.status(200).send(data)
        }
    } catch (error) {
        res.status(404).send(error)
    }
}

export async function getCart(req,res)
{
    try {
        const {userId}=req.params;
        // console.log('adaf',userId);
        const data = await cartSchema.findOne({'userId' : userId})
        // console.log(data);
        if(!data) return res.status(204).send({msg:'no cart data'})
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error)
    }
}

export async function removeItem(req,res)
{
    const {id}=req.params;
    const {pid}=req.body;
    try {
        await cartSchema.updateOne(
            { userId: id },
            { $pull: { orderItems: { _id: pid } } }
            );
            res.status(201).send('Product Removed')
    } catch (error) {
        res.status(404).send({ msg: 'Product not removed', error })
    }
}

export async function cartincrement(req,res)
{
    const { id } = req.params;
    const { pid } = req.body;
    try {
        const result = await cartSchema.findOneAndUpdate(
            {
                'userId':id,
                'orderItems.productid': pid,
            },
            {
                $inc: {
                    'orderItems.$.qty': 1,
                },
            },
            { new: true } // Return the modified document
        );

        if (result) {
            console.log('Updated cart:', result);
            res.status(200).send(result)
            return result;
        } else {
            console.log('Cart not found or product not in the cart.');
            res.status(404).send(result)
            return null;
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        throw error;
    }
}

export async function cartdecrement(req,res)
{
    const { id } = req.params;
    const { pid } = req.body;

    try {
        const result = await cartSchema.findOneAndUpdate(
            {
                'userId':id,
                'orderItems.productid': pid,
            },
            {
                $inc: {
                    'orderItems.$.qty': -1,
                },
            },
            { new: true } // Return the modified document
        );

        if (result) {
            // console.log('Updated cart:', result);
            res.status(200).send(result)
            return result;
        } else {
            console.log('Cart not found or product not in the cart.');
            res.status(404).send(result)
            return null;
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        throw error;
    }
}

export async function addAddress(req,res)
{
    // console.log(req.body);
    try {
        const {...shippingAddress}=req.body;
        const {id}=req.params;
        console.log('id=',id,"shippingaddress",shippingAddress);
            const data =await cartSchema.findOneAndUpdate({'userId' : id} ,{ $set : {'shippingAddress':{...shippingAddress}}})
            console.log('data',data);
            res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error)
    }
}

export async function placeOrder(req,res)
{
    // console.log("usercart",req.body);
    const userid=req.body.userId;
    const orders=req.body;
    const arr=[]
    // console.log(typeof(orders));
    try {
    orders.orderItems.map(async(dt)=>{
        // console.log(dt.productid,dt.qty);
        arr.push(dt)
        const data = await productSchema.findOneAndUpdate({"_id":dt.productid},{$inc :{'stock':-(dt.qty)}})
        console.log(data);
    })
    // db.orderitems.dropIndex("_id_");
            const newOrder = await orderSchema.create({ ...orders });
            console.log(newOrder);

    const result =await cartSchema.updateOne(
        { userId: userid },
        { $set: { 'orderItems': [] } }
        )
         res.status(201).send({msg:'order completed and cart cleared',result})
    
    } catch (error) {
        console.error('Error deleting orderItems:', error);
    }
}


// export async function placeOrder(req, res) {
//     const userid=req.body.userId;
//         const orders=req.body;
//         const arr=[]
//         // console.log(typeof(orders));
//         try {
//         orders.orderItems.map(async(dt)=>{
//             // console.log(dt.productid,dt.qty);
//             arr.push(dt)
//             const data = await productSchema.findOneAndUpdate({"_id":dt.productid},{$inc :{'stock':-(dt.qty)}})
//             console.log(data);
//         })
    
//         const cart= await orderSchema.findOne({userId : userid});
//             console.log(cart);
//             if(!cart){
//                 const newCart = await orderSchema.create({ ...orders });
//                 console.log(newCart);
//             }
//             else{
//                 console.log(arr);
//                 const data =await orderSchema.findOneAndUpdate({'userId' : userid} ,{ $push : {'orderItems':[...arr]}})
//                 console.log('data',data);
//             }
    
//         const result =await cartSchema.updateOne(
//             { userId: userid },
//             { $set: { 'orderItems': [] } }
//             )
//              res.status(201).send({msg:'order completed and cart cleared',result})
//             console.log("order completed and cart cleared");
        
//         } catch (error) {
//             console.error('Error deleting orderItems:', error);
//         }
// }


export async function singleOrder(req,res)
{
    // console.log("usercart",req.body);
    const userid=req.body.userId;
    const order=req.body;
    console.log(order);
    try {
    
        const data = await productSchema.findOneAndUpdate({"_id":order.productid},{$inc :{'stock':-1}})
        console.log(data);

    const cart= await orderSchema.findOne({userId : userid});
        console.log(cart);
        if(!cart){
            const newCart = await orderSchema.create({ ...order });
            console.log(newCart);
        }
        else{
            const data =await orderSchema.findOneAndUpdate({'userId' : userid} ,{ $push : {'orderItems':[order]}})
            console.log('data',data);
        }

    // const result =await cartSchema.updateOne(
    //     { userId: userid },
    //     { $set: { 'orderItems': [] } }
    //     )
         res.status(201).send({msg:'order completed and cart cleared'})
        console.log("order completed and cart cleared");
    
    } catch (error) {
        console.error('Error deleting orderItems:', error);
    }
}

export async function favItems(req,res)
{
    console.log(req.body);
    try {
        const {...favitems}=req.body;
        const {id}=req.params;
        const {...arr}=favitems.favorite[0]
        // console.log('id=',id,favitems);
        const fav= await favSchema.findOne({userId : id});
        console.log(fav);
        if(!fav){
            console.log(fav,'id',id);
            const newFav = await favSchema.create({ ...favitems });
            console.log(newFav);
            res.status(201).send(newFav);
        }
        else{
            console.log(arr);
            const data =await favSchema.findOneAndUpdate({'userId' : id} ,{ $push : {'favorite':{...arr}}})
            console.log('data',data);
            res.status(200).send(data)
        }
    } catch (error) {
        res.status(404).send(error)
    }
}

export async function getFav(req,res)
{
    try {
        const {userId}=req.params;
        // console.log('adaf',userId);
        const data = await favSchema.findOne({'userId' : userId})
        // console.log(data);
        if(!data) return res.status(204).send({msg:'no cart data'})
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error)
    }
}

export async function removeFav(req,res)
{
    const {id}=req.params;
    const {pid}=req.body;
    console.log(pid);
    try {
        await favSchema.updateOne(
            { userId: id },
            { $pull: { favorite: { productid: pid } } }
            );
            res.status(201).send('Product Removed')
    } catch (error) {
        res.status(404).send({ msg: 'Product not removed', error })
    }
}

export async function getOrder(req,res)
{
    try {
        
        const data = await orderSchema.find()
        // console.log('adaf',data.length);
        if(!data) return res.status(204).send({msg:'no orders'})
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error)
    }
}

// user
