import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [book, setBook] = useState({
        title:"",
        description:"",
        price:null,
        cover:"",
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        setBook(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/books", book)
            navigate("/")
        }catch (err) {
            console.log(err)
        }
    }
    // console.log(book)
  return (
    <div className='form'>
        <h1>Añadir nueo libro</h1>
        <input tpe='text' placeholder='Titulo' onChange={handleChange} name='title'></input>
        <input tpe='text' placeholder='Descripcion' onChange={handleChange} name='description'></input>
        <input tpe='text' placeholder='Imagen' onChange={handleChange} name='cover'></input>
        <input tpe='number' placeholder='Precio' onChange={handleChange} name='price'></input>
        <button className='formButton' onClick={handleClick}>Nuevo</button>
    </div>
  )
}

export default Add