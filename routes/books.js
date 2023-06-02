var express = require("express");
var router = express.Router();

var bookObject = require("../bookList");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { books: bookObject.books });
});
// display form
router.get("/new", function (req, res, next) {
  res.render("new");
});
// add new book
router.post("/new", function (req, res, next) {
  bookObject.books.push(req.body);
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
