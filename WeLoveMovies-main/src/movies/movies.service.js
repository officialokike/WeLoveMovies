const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

function getMovies() {
  return knex("movies").select("*");
}

function moviesShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where({ "mt.is_showing": true })
    .select("m.*")
    .groupBy("m.movie_id");
}

function readMovie(movieId) {
  return knex("movies").where({ movie_id: movieId }).select("*").first();
}

function movieInTheater(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .where({ "m.movie_id": movieId })
    .select("m.movie_id", "m.title", "t.name", "t.city", "t.state");
}

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at"
})

function movieReview(movieId){
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .where({ "r.movie_id": movieId })
    .select("r.*", "c.*")
    .then((data) => data.map(addCritic))
}

module.exports = {
    getMovies,
    moviesShowing,
    readMovie,
    movieInTheater,
    movieReview
  };
