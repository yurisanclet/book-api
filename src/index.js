const express = require('express');

const app = express();

let books = [
    { id: 1, name: 'Livro 1', description: 'description 1' },
    { id: 2, name: 'Livro 2', description: 'description 2' },
    { id: 3, name: 'Livro 3', description: 'description 3' }
];

app.use(express.json());

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(book => book.id === bookId);

    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Livro não encontrado');
    }
});

app.post('/books', (req, res) => {
    const newBook = req.body;
    newBook.id = books.length + 1;
    books.push(newBook);

    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex !== -1) {
        const updatedBook = req.body;
        books[bookIndex] = { ...books[bookIndex], ...updatedBook };

        res.json(books[bookIndex]);
    } else {
        res.status(404).send('Livro não encontrado');
    }
});

app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1)[0];

        res.json(deletedBook);
    } else {
        res.status(404).send('Livro não encontrado');
    }
});

app.patch('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex !== -1) {
        const updatedBook = req.body;
        books[bookIndex] = { ...books[bookIndex], ...updatedBook };

        res.json(books[bookIndex]);
    } else {
        res.status(404).send('Livro não encontrado');
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
