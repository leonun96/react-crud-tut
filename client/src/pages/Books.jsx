import React, { useEffect, useState  } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        const fetchAllBooks = async() => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data);
                console.log(res)
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchAllBooks();
    }, [])
    // EL array vacio es para que corra solo nua vez?
    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8800/books/" + id);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div>
        <h1>Librería de leo</h1>
        <div className="books">
            {books.map( book => (
                <div className="book" key={book.id}>
                    {book.cover && <img src={"book.cover"}  alt=""/>}
                    <h2>{book.title}</h2>
                    <p>{book.description}</p>
                    <span>{book.price ?? 0}</span>
                    <button className="delete" onClick={() => handleDelete(book.id)}>Eliminar</button>
                    <button className="update"><Link to={`/update/${book.id}`}>Actualizar</Link></button>
                </div>
            ))}
        </div>
        <button><Link to="/add">Añadir nuevo libro</Link></button>
    </div>
  )
}

export default Books