import React, { useState } from 'react';
import axios from 'axios';

const NewMovie = (props) => {
    const [newMovie, setNewMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: [''],
    })

    const newMovieHandler = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if(name === 'metascore') {
            value = Number(value);
        }

        setNewMovie({...newMovie, [name]: value})
    }
    const newStarsHandler = (e, i) => {
        let updateStars = [...newMovie.stars];
        updateStars[i] = e.target.value;
        setNewMovie({...newMovie, stars: [...updateStars]})
    }

    const newStarInput = () => {
        setNewMovie({...newMovie, stars: [...newMovie.stars, '']})
    }

    const newMovieSubmit = () => {
        console.log(newMovie)
        axios
            .post('http://localhost:5000/api/movies', newMovie)
            .then(res => props.history.push('/'))
            .catch(err => console.log(err))
    }

    return (
        <>
        <form onSubmit={(e) => {
            e.preventDefault();
            newMovieSubmit()
        }} className='new-movie'>
            <input type='text' name='title'  onChange={(e) => newMovieHandler(e)} value={newMovie.title} placeholder='Title' />
            <input type='text' name='director'  onChange={(e) => newMovieHandler(e)} value={newMovie.director} placeholder='Director' />
            <input type='number' name='metascore'  onChange={(e) => newMovieHandler(e)} value={newMovie.metascore} placeholder='Metascore' />
            {newMovie.stars.map((star, index) => {
                return <input key={index} type='text' value={newMovie.stars[index]} onChange={(e) => newStarsHandler(e, index)} />
            })}
            <button>Add Movie</button>
        </form>
        <button onClick={newStarInput}>Add Star</button>
        </>
    )
}

export default NewMovie;