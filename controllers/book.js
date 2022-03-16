const Book = require("../models/book.js")

const getBooks = async(req,res) =>{
  const books = await Book.find({},{comments:0,__v:0})
  res.json(books)
}

const createBook = async (req,res) =>{
  let _title = req.body.title;
  if(!_title){
    res.json("missing required field title")
    return
  }
  const {_id,title} = await Book.create({title:_title})
  res.json({_id,title})
}

const deleteBooks = async (req,res) =>{
  await Book.deleteMany()
  res.json('complete delete successful')
}

const getBook = async(req,res) => {
  let bookid = req.params.id;
  const book = await Book.findById(bookid)
  if(!book){
    res.json("no book exists")
    return
  }
  const {commentcount,__v,...filteredBook} = book._doc
  res.json(filteredBook)
}

const comment = async (req,res) =>{
  let bookid = req.params.id;
  let comment = req.body.comment;
  if(!comment){
    res.json("missing required field comment")
    return
  }
  const book = await Book.findByIdAndUpdate(bookid,{$push:{comments:comment}},{new:true})
  if(!book){
    res.json("no book exists")
    return
  }
  const {commentcount,__v,...filteredBook} = book._doc
  res.json(filteredBook)
}

const deleteBook = async (req,res) => {
  let bookid = req.params.id;
  const book = await Book.findByIdAndDelete(bookid)
  if(!book){
    res.json("no book exists")
    return
  }
  res.json('delete successful')
}

module.exports = {getBooks,getBook,deleteBooks,deleteBook,comment,createBook}