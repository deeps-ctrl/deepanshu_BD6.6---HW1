const cors = require('cors')
const express = require('express')

const { getAllMovies, getMovieById } = require('./controllers')

const app = express()

app.use(cors())
app.use(express.json())

app.get("/movies", (req, res) => {
    const movies = getAllMovies();
    res.status(200).json({ movies });
});

app.get("/movies/details/:id", (req, res) => {
    const id = Number(req.params.id);
    const movie = getMovieById(id);
    res.status(200).json({ movie })
});

module.exports = { app }