import React, { useState } from "react";
import { initialMovies } from "./components/top10";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState(initialMovies);
  const [fav, setFav] = useState([]);
  const getMovies = async function (s) {
    const result = await (
      await fetch(`http://www.omdbapi.com/?s=${s}&type=movie&apikey=46595bab`)
    ).json();
    if (result["Search"]) {
      setMovies(result["Search"]);
    } else {
      alert("Invalid Title");
    }
  };
  const home = function() {
    if(home){
      setMovies(initialMovies);
    }
  }
  const searchMovies = function () {
    if (search) {
      getMovies(search);
    } else {
      setMovies(initialMovies);
    }
    // setMovies(initialMovies);
  };
  const addFav = function (item) {
    let s = JSON.stringify(item);
    for (let i = 0; i < fav.length; i++) {
      if (s === JSON.stringify(fav[i])) {
        alert("Movie already EXIST in your Favorites list");
        return;
      }
    }
    setFav([item, ...fav]);
  };
  const removeFav = function (i) {
    let arr = fav;
    if (arr.length === 1) {
      setFav([]);
    } else if (i === arr.length - 1) {
      arr.length = arr.length - 1;
      setFav([...arr]);
    } else {
      for (let j = i; j < arr.length - 1; j++) {
        arr[j] = arr[j + 1];
      }
      arr.length = arr.length - 1;
      setFav([...arr]);
    }
  };
  return (
    <div className="App">
      <div className="header">
        <h1 className="home" onClick={home}>Favorite Movies App</h1>
        <div className="searchbar">
          <input
            type="text"
            id="search"
            onChange={() => setSearch(document.getElementById("search").value)}
            value={search}
          />
          <button className="search_button" onClick={searchMovies}>Search</button>
        </div>
      </div>
      <br />
      <div className="header">
        <h1 className="center">Movies</h1>
      </div>
      <div className="container">
        {movies.map((item, i) => {
          return (
            <div className="box" key={i} onClick={() => addFav(item)}>
              <img src={item.Poster} alt={item.Title} />
              <div className="movie" id={`movie-${i}`}>
                <h4 className="movie_add">Add to Favorites</h4>
              </div>
            </div>
          );
        })}
      </div>
      <br />
      <div className="header">
        <h1 className="center">Favorites </h1>
      </div>
      <div className="container">
        {fav.map((item, i) => {
          return (
            <div className="box" key={i} onClick={() => removeFav(i)}>
              <img src={item.Poster} alt={item.Title} />
              <div className="movie" id={`movie-${i}`}>
                <h4 >Remove from Favorites</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
