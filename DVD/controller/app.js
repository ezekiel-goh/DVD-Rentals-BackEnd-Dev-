const express = require("express");
const app = express();

// import models
const Film = require("../model/Film");
const Actors = require("../model/Actors");

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
  var maxRentalPrice = req.query.maxRentalPrice;

  Film.getSearchedTitles(title, filmCategory, maxRentalPrice, (err, result) => {
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
app.get("/filmDetails", function (req, res) {
  var film_id = req.query.film_id;
  Film.FilmDetails(film_id, (err, result) => {
    //-- you either get err or result
    if (!err) {
      console.log(result.length);
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

//-- post Actors
app.post("/actors", function (req, res) {
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;

  Actors.postActors(first_name, last_name, function (err, result) {
    if (!err) {
      console.log("no errors");
      res.type("json");
      res.status(201).send({ actor_id: +result });
    } else if (first_name == null || last_name == null) {
      res.status(400).send({ error_msg: "missing data" });
    } else {
      res.status(500).send({ error_msg: "Internal server error" });
    }
  });
});

//-- login
app.post("/login/", (req, res) => {
  Staff.verify(
    req.body.email, 
    req.body.password, 
    (error, staff) => {
    if (error) {
      res.status(500).send();
      return;
    }
    if (staff === null) {
      res.status(401).send();
      return;
    }
    const payload = { staff_id: staff.staff.id };
    jwt.sign(payload, JWT_SECRET, { algorithm: "HS256" }, (error, token) => {
      if (error) {
        console.log(error);
        res.status(401).send();
        return;
      }
      res.status(200).send({
        token: token,
        staff_id: staff.staff.id,
      });
    });
  });
});

module.exports = app;
