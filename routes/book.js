const express = require("express");
const bookrouting = express.Router();
const auth = require('../utilities/auth')
const bookService = require('../service/book')
const multer = require('multer'); 
const userrouting = require("./user");
const { response } = require("express");

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null,new Date().getTime()+'-'+file.originalname)
    }
})

const upload = multer({storage:storage})

bookrouting.post('/insertbook',auth, upload.single('image'),async(req,res,next)=>{
    try {
        bookObj={}
        const {bName,price,category} = req.body
        bookObj.user = req.user.id
        bookObj.bName = bName
        bookObj.price = price
        bookObj.category = category
        bookObj.image = req.file.path
        const response = await  bookService.insertBook(bookObj)
        return res.json({response})
    } catch (error) {
        next(error)
    }

})

bookrouting.get('/getallBooks',async(req,res,next)=>{
    try {
        const response = await bookService.getAllBooks()
        if(response.length>0)
            res.json({response})
        else
        res.json({response:"Sorry no books found"})
        
    } catch (error) {
        next(error)
    }
})

bookrouting.get('/getBooksBycategory/:category',async(req,res,next)=>{
    try {
        const response = await bookService.findBookByCategory(req.params.category)
        if(response.length>0)
            res.json({response})
        else
        res.json({response:"Sorry no books found for this category"})
        
    } catch (error) {
        next(error)
    }
})

bookrouting.get('/getBooksByNames/:name',async(req,res,next)=>{
    try {
        const response = await bookService.findBookByName(req.params.name)
        if(response.length>0)
            res.json({response})
        else
        res.json({response:"Sorry no books found for this name"})
        
    } catch (error) {
        next(error)
    }
})

bookrouting.put('/updatebook/:bookId',auth,async(req,res,next)=>{
    try {
        const response = await bookService.updateBook(req.user.id,req.params.bookId,req.body)
        res.json({response})
    } catch (error) {
        next(error)
    }
})

bookrouting.delete('/deletebook/:bookId',auth,async(req,res,next)=>{
    try {
        const response = await bookService.deleteBook(req.user.id,req.params.bookId)
        return res.json({"response":"Deleted successfully"})
    } catch (error) {
        next(error)
    }
})

module.exports = bookrouting;
