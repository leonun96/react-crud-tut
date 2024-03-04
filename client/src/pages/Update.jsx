import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export const Update = () => {
    const [book, setBook] = useState({
        title:"",
        description:"",
        price:null,
        cover:"",
    });
    const navigate = useNavigate()
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];
    // console.log(location.pathname.split("/")[2])

    const handleChange = (e) => {
        setBook(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.put("http://localhost:8800/books/" + bookId, book)
            navigate("/")
        }catch (err) {
            console.log(err)
        }
    }
  return (
    <div className='form'>
        <h1>Actualizar Libro</h1>
        <input tpe='text' placeholder='Titulo' onChange={handleChange} name='title'></input>
        <input tpe='text' placeholder='Descripcion' onChange={handleChange} name='description'></input>
        <input tpe='text' placeholder='Imagen' onChange={handleChange} name='cover'></input>
        <input tpe='number' placeholder='Precio' onChange={handleChange} name='price'></input>
        <button className='formButton' onClick={handleClick}>Update</button>
    </div>
  )
}
