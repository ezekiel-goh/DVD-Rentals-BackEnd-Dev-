var db = require("./databaseConfig.js");

var Film = {
  getSearchedTitles: function (title, release_year, rating, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql =
          "SELECT film.title, film.release_year, film.rating FROM film";
        conn.query(sql, [title, release_year, rating], function (err, result) {
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            console.log(result);
            return callback(null, result);
          }
        });
      }
    });
  },

  searchTitles: function (title, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql =
          "SELECT film.title, category.name AS category, film.release_year,  film.description, film.rating, actor.first_name, actor.last_name FROM category LEFT JOIN film_category ON category.category_id = film_category.category_id LEFT JOIN film ON film_category.film_id = film.film_id LEFT JOIN film_actor ON film.film_id = film_actor.film_id LEFT JOIN actor ON film_actor.actor_id = actor.actor_id WHERE film.rental_rate >= 0 AND film.rental_rate <= ?";
        conn.query(sql, 
          [title, category, rental_rate], function (err, result) {
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            console.log(result);
            return callback(null, result);
          }
        });
      }
    });
  },
};

module.exports = Film;
