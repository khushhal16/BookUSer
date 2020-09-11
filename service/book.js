const Book=require('../model/book');
const bookService = {};

generatebookId = async()=>{
    try {
        let bIds =  await Book.distinct("bookId")       
        if(bIds.length===0)
        return 1
        let newId= Math.max(...bIds)
        return newId+1
    } catch (error) {
        throw error
    }

    }


bookService.insertBook = async (bookObj) => {
   
    bookObj.bookId = await generatebookId()
    const {bookId,user,bName,price,category,image} = bookObj
    try {
       const book = new Book({user,bookId,bName,price,category,image})
       book_saved = await book.save()
       return book_saved
       
    } catch (error) {
        throw error    
    }
    
  };

  bookService.findBookByCategory = async(category)=>{
      try {
          books = await Book.find({category:category})
          return books
      } catch (error) {
          throw error
      }
  }
   
  bookService.findBookByName= async(name)=>{
    try {
        books = await Book.find({bName:name})
        return books
    } catch (error) {
        throw error
    }
}

bookService.getAllBooks = async()=>{
    try {
        const books = await Book.find({})
        return books 
    } catch (error) {
        throw error
    }
}

bookService.updateBook = async(userId,bookId,bookObj)=>{
    try {
        let book = await Book.findOne({_id:bookId})
        if(!book){
            let err = new Error("Sorry book doesn't exist")
            err.status = 404
            throw err
        }
        if(book.user!=userId){
            let err = new Error("Sorry not authorised")
            err.status=401
            throw err
        }
        book.category = bookObj.category
        book.price = bookObj.price
        book.bName = bookObj.bName
        const book_saved = await book.save()
        return book_saved

    } catch (error) {
        throw error
    }
}

bookService.deleteBook = async(userId,bookId)=>{
    try {
        let book = await Book.findOne({_id:bookId})
        if(!book){
            let err = new Error("Sorry book doesn't exist")
            err.status = 404
            throw err
        }
        if(book.user!=userId){
            let err = new Error("Sorry not authorised")
            err.status=401
            throw err
        }
       var deleted_one = await Book.deleteOne({_id:bookId})
       return
    } catch (error) {
        throw error
    }
}

module.exports=bookService