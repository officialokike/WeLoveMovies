const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");

async function list(req, res, next) {
    if(!req.query.is_showing){
  const allMovies = await service.getMovies();
  res.json({ data: allMovies });
}else{
    const moviesAndTheater = await service.moviesShowing();
    res.json({data: moviesAndTheater})
}
}

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.readMovie(Number(movieId));
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: "No movie found",
  });
}

async function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

async function checkMovieInTheater(req, res, next){
  const { movieId } = req.params
  const movie = await service.movieInTheater(movieId)
  res.json({data: movie})
}

async function movieReviewAndCritic(req, res, next){
  const { movieId } = req.params
  const review = await service.movieReview(movieId)
  res.json({data: review})
}

module.exports = {
  list,
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  check: [asyncErrorBoundary(movieExists), asyncErrorBoundary(checkMovieInTheater)],
  review: [asyncErrorBoundary(movieExists), asyncErrorBoundary(movieReviewAndCritic)]
};
