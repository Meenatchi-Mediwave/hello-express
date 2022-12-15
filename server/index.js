require("dotenv").config();
const express = require("express");

const app = express();

// get body json
app.use(express.json());

const books = [
  { id: 1234567890, name: "Harry Potter" },
  { id: 9876543210, name: "IT" },
  { id: 7876443310, name: "Alice in wonderland" },
];

const PORT = process.env.PORT || 4567;
const APP_NAME = process.env.APP_NAME || "api";

// CRUD
// create read update delete

app.get("/books", (req, res) => {
  return res.send(books);
});

app.post("/books", (req, res) => {
  // { name: 'Game of thrones' }
  if (!req.body.name) {
    return res.status(400).send({
      message: "Book must have a name",
    });
  }
  const newBook = {
    name: req.body.name,
    id: new Date().getTime(),
  };
  books.push(newBook);
  return res.send(newBook);
});

app.put("/books/:bookid", (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Book name not passed",
    });
  }

  const bookIndex = books.findIndex((b) => b.id === Number(req.params.bookid));

  if (bookIndex === -1) {
    return res.status(404).send({
      message: "Book not found",
    });
  }
  books[bookIndex]["name"] = req.body.name;
  return res.send({
    message: "Book updated",
  });
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

// not found middleware
app.use((req, res) => {
  return res.status(404).send({
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server: ${APP_NAME} running on ${PORT}`);
});
