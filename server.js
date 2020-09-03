const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

const TMDB_API_KEY = "46f1c745c07d319a2d5fce90c66ab2c9";
const OMDB_API_KEY = "543c445e";

app.use(cors());
app.use(bodyParser.json());

const empty = {
  results: [],
};

app.post("/getmovies", async (req, res) => {
  const { quary, page } = req.body;
  try {
    const movieList = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(
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

app.get("/", (req, res) => {
  for (let i = 0; i <= 20; i++) {
    console.log(process.env.TMDB_API_KEY);
  }
  res.send("it is working!");
});

/* app.get("/getPlayer/", (req, res) => {
  console.log(req.query.imdb);
  fetch(`https://api.gdriveplayer.us/v1/imdb/${req.query.imdb}`)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response.player_url) {
        res.json(response.player_url);
      } else {
        res.status(400).send({ message: "Video not found" });
      }
    })
    .catch((err) => console.log("error"));
});
 */
app.get("/tmdb-data/", async (req, res) => {
  const movie = await fetch(
    `https://api.themoviedb.org/3/movie/${req.query.id}?api_key=${TMDB_API_KEY}&language=en-US`
  );
  const movieJSON = await movie.json();
  res.json(movieJSON);
});

app.get("/imdb-data/", async (req, res) => {
  const data = await fetch(
    `http://www.omdbapi.com/?i=${req.query.id}&apikey=${OMDB_API_KEY}`
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
