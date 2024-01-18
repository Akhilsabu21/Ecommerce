import mongoose, { Mongoose } from "mongoose";
export default async function connection()
{
    const URI=process.env.URI+process.env.DB_NAME;
    const db=await mongoose.connect(URI)
    console.log("DataBase connected");
    return db;
}