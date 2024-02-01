import express from "express";
import Book from "../models/bookModel.js";
const router=express.Router();

//route to Save a new book
router.post("/",async(req,res)=>{
    try{
    
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message:'Send all required files : title,author,publishYear'
            });
        }
        const newBook=await Book.create({
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        });

        return res.status(201).send(newBook);
    } 
    catch(error){
        console.log(error.message);
        return res.status(500).send({message:error.message});
    }
});

//Route to get all books from the database
router.get("/",async(req,res)=>{
    try{
        const allbooks=await Book.find();
        res.status(200).json({
            count:Book.length,
            data:allbooks
        });
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.mesaage});
    }
});

//Route to get a single book through id 
router.get("/:id",async(req,res)=>{
    try{
        const book=await Book.findById(req.params.id);
        res.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.mesaage});
    }
});

//Route to update a book By id
router.put('/:id',async(req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message:'Send all required files : title,author,publishYear'
            });
        }

        const updateBook=await Book.findByIdAndUpdate(req.params.id,req.body);
        if(!updateBook){
            return res.status(404).json({message:'Book Not Found'});
        }
        return res.status(200).json({message:"Book updated successfully"});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.mesaage});
    }
});

router.delete("/:id",async(req,res)=>{
    try{
        const book=await Book.findByIdAndDelete(req.params.id);
        if(!book){
            return res.status(404).json({message:'Book Not Found'});
        }
        return res.status(200).json({message:"Book deleted successfully"});

    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

export default router;

