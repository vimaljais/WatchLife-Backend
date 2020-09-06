const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const empty = {
  results: [],
};
//to fetch movie list
app.get("/getmovies", async (req, res) => {
  const quary = req.query.qs;
  const page = req.query.page;
  try {
    const movieList = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.TMDB_API_KEY
      }&language=en-US&query=${encodeURIComponent(
        quary
      )}&page=${page}&include_adult=false`
    );
    const movieListJSON = await movieList.json();
    res.json(movieListJSON);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error obtaining results");
  }
});
// to wake up the backend on frontend call
app.get("/", (req, res) => {
  console.log("waking up");
  res.send("it is working!");
});
//to chceck whether the movie is available on gdrive
app.get("/getPlayer/", (req, res) => {
  fetch(`https://api.gdriveplayer.us/v1/imdb/${req.query.imdb}`)
    .then((response) => response.json())
    .then((response) => {
      if (response.player_url) {
        res.json(response);
      } else {
        res.send({ message: "Video not found" });
      }
    })
    .catch((err) => console.log("error"));
});
//to get tmdb-data
app.get("/tmdb-data/", async (req, res) => {
  const movie = await fetch(
    `https://api.themoviedb.org/3/movie/${req.query.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
  );
  const movieJSON = await movie.json();
  res.json(movieJSON);
});
//to get imdb-data
app.get("/imdb-data/", async (req, res) => {
  const data = await fetch(
    `http://www.omdbapi.com/?i=${req.query.id}&apikey=${process.env.OMDB_API_KEY}`
  );
  const dataJSON = await data.json();
  res.json(dataJSON);
});

app.listen(process.env.PORT, () => {
  console.log("the port is " + process.env.PORT);
  for (let i = 0; i <= 20; i++) {
    console.log(process.env.TMDB_API_KEY);
  }
});
