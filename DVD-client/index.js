const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile("/public/index.html", { root: __dirname });
});

app.get("/searchResults", (req, res) => {
  res.sendFile("/public/searchResults.html", { root: __dirname });
});

app.get("/:title/", (req, res) => {
  res.sendFile("/public/FilmDetails.html", { root: __dirname });
});

app.get("/login/", (req, res) => {
  res.sendFile("/public/login.html", { root: __dirname });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Client server has started listening on port ${PORT}`);
});
