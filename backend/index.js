import express from "express";
import {PORT,CONNECTION_STRING} from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoutes.js"
import cors from 'cors';

//middleware for parsing request body
const app=express();

app.use(express.json());


//Middleware for handling CORS policy
//Option1 :Allow all origins with default of Cors(*)
app.use(cors());

//Option 2:allow custom Origins
// app.use(cors({
//     origin:"http://localhost/3000",
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }));

//middleware
app.use("/books",booksRoute);

mongoose.connect(CONNECTION_STRING)
.then(()=>{
    console.log('App connected to database');
    app.listen(PORT,()=>{
        console.log(`App is listening to port ${PORT}`);
    });
})
.catch((error=>{
    console.log(error);
}))

app.get("/",(req,res)=>{
    res.send("Hi there ");
});
