import express from "express";
// import mysql from "mysql"; METODO DE PASSWORD MYSQL ANTIGUO PARA MYSQL 5
import mysql from "mysql2";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1gn_mysql",
    database:"test"
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("HELLO WORLD YES!");
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

app.post("/books", (req,res) => {
    const query = "INSERT INTO books (`title`, `description`, `cover`, `price`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price
    ];
    // return values;
    db.query(query, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const query = "DELETE FROM books WHERE id = ?";

    db.query(query, [bookId], (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const query = "UPDATE books SET `title` = ?, `description` = ?, `cover` = ?, `price` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price
    ];

    db.query(query, [...values, bookId], (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8800, () => {
    console.log('CONNECTED II');
})