
var db = require("./databaseConfig.js");

var Actors = {
postActors: function (first_name, last_name, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("connected!");
        var sql = "INSERT INTO actor(first_name, last_name) VALUES (?, ?)";
        conn.query(sql, [first_name, last_name], function (err, result) {
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            console.log(result);
            return callback(null, result.insertId);
          }
        });
      }
    });
  },
}
module.exports = Actors;
