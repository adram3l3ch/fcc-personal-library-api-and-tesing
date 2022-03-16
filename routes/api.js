
'use strict';

const router = require("express").Router()
const {getBooks,getBook,deleteBooks,deleteBook,comment,createBook} = require("../controllers/book.js")

router.route("/").get(getBooks).post(createBook).delete(deleteBooks)
router.route("/:id").get(getBook).post(comment).delete(deleteBook)

module.exports = router
