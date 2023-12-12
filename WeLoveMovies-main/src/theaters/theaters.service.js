const knex = require("../db/connection");

function getAllTheaters() {
  return knex("theaters").select("*");
}

function addMovieAndMovieTheaters(theaterId) {
  return knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .where({ theater_id: theaterId })
    .select("m.*", "mt.is_showing");
}

module.exports = {
  getAllTheaters,
  addMovieAndMovieTheaters,
};
