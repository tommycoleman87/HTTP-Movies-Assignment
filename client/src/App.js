import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';
import NewMovie from './Movies/NewMovie';
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const movies = axios.get("http://localhost:5000/api/movies");
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        res.data.forEach(movie => {
          savedList.forEach(sMovie => {
            if(movie.id === sMovie.id) {
             const newSavedList = savedList.filter(savedMovie => savedMovie !== sMovie)
              setSavedList([...newSavedList, movie])
            } 
          })
        })
      })
  }, [movies])

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
      path='/update-movie/:id'
      component={UpdateMovie}
      />
      <Route
      path='/new-movie'
      component={NewMovie}
      />
    </>
  );
};

export default App;
