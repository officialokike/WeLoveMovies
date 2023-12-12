const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const theaters = await service.getAllTheaters();

  await Promise.all(
    theaters.map(async (theater) => {
      const moviesPlayingInTheater = await service.addMovieAndMovieTheaters(
        theater.theater_id
      );
      theater.movies = moviesPlayingInTheater;
    })
  );
  res.json({ data: theaters });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
