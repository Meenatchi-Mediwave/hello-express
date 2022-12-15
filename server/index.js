require("dotenv").config();
const express = require("express");

const app = express();

const books = [
  { id: 1234567890, name: "Harry Potter" },
  { id: 9876543210, name: "IT" },
  { id: 7876443310, name: "Alice in wonderland" },
];

const PORT = process.env.PORT || 4567;
const APP_NAME = process.env.APP_NAME || "api";

app.get("/books", (req, res) => {
  return res.send(books);
});

app.get("/books/:bookid", (req, res) => {
  const book = books.find((b) => b.id === Number(req.params.bookid));
  if (!book) {
    return res.status(404).send({
      message: "Book not found",
    });
  }
  return res.send(book);
});

app.delete("/books/:bookid", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === Number(req.params.bookid));
  if (bookIndex === -1) {
    return res.status(404).send({
      message: "Book not found",
    });
  }
  books.splice(bookIndex, 1);
  return res.send({
    message: "Book removed",
  });
});

app.listen(PORT, () => {
  console.log(`Server: ${APP_NAME} running on ${PORT}`);
});
