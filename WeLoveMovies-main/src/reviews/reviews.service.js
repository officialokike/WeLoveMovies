const knex = require("../db/connection");

function read(reviewId){
  return knex("reviews")
    .where({review_id: reviewId})
    .select("*")
    .first();
}

async function readCritic(critic_id){
  return knex("critics")
  .where({critic_id})
  .first();
}

async function setCritic(review){
  review.critic = await readCritic(review.critic_id)
  return review
}

function update(review){
  return knex("reviews")
    .where({review_id: review.review_id})
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic)
}

function destroy(reviewId){
  return knex("reviews")
  .where({review_id: reviewId})
  .select("*")
  .del();
}

module.exports = {
  read,
  destroy,
  update
}