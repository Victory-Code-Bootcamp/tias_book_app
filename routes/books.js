const Book = require("../models/Book");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
require("dotenv").config();

var bookObject = require("../bookList");
mongoose.connect(
  `mongodb+srv://tiachristensen:${process.env.MONGODB}@cluster0.oirtthh.mongodb.net/`
);

/* GET home page. */
router.get("/", async function (req, res, next) {
  const books = await Book.find();
  res.render("index", { books: books });
});
// display form
router.get("/new", function (req, res, next) {
  res.render("new");
});
// add new book
router.post("/new", async function (req, res, next) {
  await Book.create(req.body);
  res.redirect("/");
});
// display selected book
router.get("/edit/:id", function (req, res, next) {
  let selectedBook = bookObject.books.filter(
    (book) => book.isbn === req.params.id
  );
  res.render("edit", { book: selectedBook[0] });
  bookObject.books.push(req.body);
  res.redirect("/");
});
//edit book in list
router.post("/edit/:id", function (req, res, next) {
  let newBookList = bookObject.books.map((book) => {
    if (book.isbn === req.params.id) {
      book = req.body;
    }
    return book;
  });
  bookObject.books = newBookList;
  res.redirect("/");
});
//removes book from list
router.post("/delete/:id", function (req, res, next) {
  let bookId = req.params.id;
  let newBookList = bookObject.books.filter((book) => book.isbn != bookId);
  bookObject.books = newBookList;
  res.redirect("/");
});

module.exports = router;
