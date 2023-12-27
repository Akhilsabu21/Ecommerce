import adminSchema from './model/admin.model.js';
import bcrypt from 'bcrypt';
import pkg from 'jsonwebtoken';
import productSchema from './model/product.model.js';
import categorySchema from './model/category.model.js'
import path from "path";

const { sign } = pkg;

// admin
export function addAdmin(req, res) {
    try {
        const { email, UserName, password, phone } = req.body;
        bcrypt.hash(password, 10)
            .then((hashedPWd) => {
                adminSchema.create({ email, UserName, password: hashedPWd, phone })
            }).then(() => {
                res.status(200).send({ msg: `${UserName}` })
            })
    } catch (error) {
        console.log(error);
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
        res.send(productSchema.create({ ...Products, thumbnile, images }))
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
    res.end();
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
