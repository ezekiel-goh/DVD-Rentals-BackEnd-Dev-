var db = require("./databaseConfig.js");

var Film = {
  // searchFinder: function (title, film_category, maxRentalPrice, callback) {
  //   var conn = db.getConnection();
  //   title = "%" + title + "%";
  //   film_category = Number(film_category);
  //   maxRentalPrice = Number(maxRentalPrice)
  //   console.log(title)
  //   console.log(film_category)
  //   console.log(maxRentalPrice)
  // },

  // -- Get Categories
  getCategories: function (name, category_id, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql =
          "SELECT category.name, category.category_id FROM category";
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



  getSearchedTitles: function (title, filmCategory, maxRentalPrice, callback) {
    var conn = db.getConnection();
    title = "%" + title + "%";
    filmCategory = filmCategory;
    maxRentalPrice = Number(maxRentalPrice);
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        if (filmCategory == 0) {
          selectedCategory = "";
        } else {
          selectedCategory = " AND category.name = ?";
        }

        console.log("Connected!");
        var sql =
          "SELECT film.title, film.release_year, film.rental_rate, film.rating, film.film_id FROM category LEFT JOIN film_category ON category.category_id = film_category.category_id LEFT JOIN film ON film_category.film_id = film.film_id WHERE UPPER(film.title) LIKE UPPER(?)";
          sql+=selectedCategory+" AND film.rental_rate <= 9 ORDER BY UPPER(film.title)"
          console.log(sql.length)
        conn.query(sql, [title, filmCategory, maxRentalPrice], function (err, result) {
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

  FilmDetails: function (title, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql =
          "SELECT film.title, category.name AS category, film.release_year,  film.description, film.rating, actor.first_name, actor.last_name FROM category LEFT JOIN film_category ON category.category_id = film_category.category_id LEFT JOIN film ON film_category.film_id = film.film_id LEFT JOIN film_actor ON film.film_id = film_actor.film_id LEFT JOIN actor ON film_actor.actor_id = actor.actor_id WHERE film.rental_rate >= 0 AND film.rental_rate <= ?";
        conn.query(sql, [title, category, rental_rate], function (err, result) {
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
