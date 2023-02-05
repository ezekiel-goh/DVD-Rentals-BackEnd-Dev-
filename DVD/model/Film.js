//Ezekiel Goh
//P2205881
//DIT/FT/1B/08

var db = require("./databaseConfig.js");

var Film = {
  //-- Get Categories
  getCategories: function (name, category_id, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = "SELECT category.name, category.category_id FROM category";
        conn.query(sql, [name, category_id], function (err, result) {
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

  //-- Search Results

  getSearchedTitles: function (title, filmCategory, maxRentalPrice, callback) {
    var conn = db.getConnection();
    title = "%" + title + "%";
    filmCategory = filmCategory;
    // maxRentalPrice = parseFloat(maxRentalPrice);
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        if (filmCategory == "") {
          selectedCategory = "";
        } else {
          selectedCategory = " AND category.name = ?";
        }

        console.log("Connected!");
        var sql =
          "SELECT film.title, film.release_year, film.rental_rate, film.rating, film.film_id FROM category LEFT JOIN film_category ON category.category_id = film_category.category_id LEFT JOIN film ON film_category.film_id = film.film_id WHERE UPPER(film.title) LIKE UPPER(?)";
        sql +=
          selectedCategory +
          " AND film.rental_rate <= ? ORDER BY UPPER(film.title) ASC";
        console.log(sql.length);

        conn.query(
          sql,
          [title, filmCategory, maxRentalPrice],
          function (err, result) {
            conn.end();
            if (err) {
              console.log(err);
              return callback(err, null);
            } else {
              console.log(result);
              return callback(null, result);
            }
          }
        );
      }
    });
  },

  //-- Film Details
  FilmDetails: function (film_id, callback) {
    var conn = db.getConnection();
    film_id = film_id;
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql =
          "SELECT film.title, category.name AS category, film.release_year, film.description, film.rating, actor.first_name, actor.last_name FROM category LEFT JOIN film_category ON category.category_id = film_category.category_id LEFT JOIN film ON film_category.film_id = film.film_id LEFT JOIN film_actor ON film.film_id = film_actor.film_id LEFT JOIN actor ON film_actor.actor_id = actor.actor_id WHERE film.film_id = ?";
        conn.query(sql, [film_id], function (err, result) {
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
