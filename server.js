import express from 'express';
import env from 'dotenv';
import connection from './connection.js';
import router from './router.js';
import cors from 'cors';

const app=express();
env.config();
app.use(cors())
app.use(express.json({limit:'30mb'}))
app.use('/api',router)
app.use(express.static('./dist'))
connection()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Server Started");
    })
}).catch((error)=>{
    console.log(error);
})