const express = require("express");
const app = express();

// import the searchByTitle model
const Film = require("../model/Film");

//import the body-parser middleware
const bodyParser = require("body-parser");
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

//use the middleware
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const isLoggedInMiddleware = require("../isLoggedInMiddleware");

// // -- Searched Movie Titles
// app.get("/movie_titles", function (req, res) {
//   // var title = req.params.title;

//   Film.getAllTitles(function (err, result) {
//     //-- you either get err or result
//     if (!err) {
//       console.log(result[0]);
//       if (result[0] === undefined) {
//         //-- When id = undefined
//         res.status(200).send([]);
//       } else {
//         res.status(200).send(result);
//       }
//     } else {
//       res.status(500).send({ error_msg: "Internal server error" });
//     }
//   });
// });



// -- Search By

app.get("/searchResults/categories/", function (req, res) {
  var name = req.query.name;
  var category_id = req.query.category_id;

  Film.getCategories(name, category_id, (err, result) => {
    //-- you either get err or result
    if (!err) {
      console.log(result);
      if (result[0] === undefined) {
        //-- When id = undefined
        res.status(200).send([]);
      } else {
        res.status(200).send(result);
      }
    } else {
      res.status(500).send({ error_msg: "Internal server error" });
    }
  });
});

//-- get searched titles
app.get("/searchResults/", function (req, res) {
  var title = req.query.title;
  var filmCategory = req.query.filmCategory;
  var rental_rate = parseFloat(req.query.rental_rate);


  Film.getSearchedTitles(title, filmCategory, rental_rate, (err, result) => {
    //-- you either get err or result
    if (!err) {
      console.log(result);
      if (result[0] === undefined) {
        //-- When id = undefined
        res.status(200).send([]);
      } else {
        res.status(200).send(result);
      }
    } else {
      res.status(500).send({ error_msg: "Internal server error" });
    }
  });
});

// -- Film Details
app.get("/searchResults/:title/", function (req, res) {
  var title = req.query.title;
  var category = req.query.category;
  var rental_rate = parseFloat(req.query.rental_rate);

  Film.FilmDetails(title, category, rental_rate, (err, result) => {
    //-- you either get err or result
    if (!err) {
      console.log(result);
      if (result[0] === undefined) {
        //-- When id = undefined
        res.status(200).send([]);
      } else {
        res.status(200).send(result);
      }
    } else {
      res.status(500).send({ error_msg: "Internal server error" });
    }
  });
});

module.exports = app;
