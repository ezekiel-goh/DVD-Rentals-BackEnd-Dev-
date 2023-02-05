var db = require("./databaseConfig.js");

var Staff = {
    verify: function (email, password, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            console.log("Connected!");
            var sql =
              "SELECT * FROM staff WHERE email = ? AND password = ?"
            conn.query(sql, [email, password], function (err, result) {
              conn.end();
              if (err) {
                console.log(err);
                return callback(err, null);
              }
              if(result.length === 0){
                return callback(null, null)
              } else {
                const staff = result[0]
                return callback(null, staff);
              }
            });
          }
        });
      },
}

module.exports = Staff;
